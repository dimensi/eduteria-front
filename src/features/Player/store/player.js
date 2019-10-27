import {
  createEvent,
  combine,
  createStore,
  guard,
  sample,
  merge,
  createEffect,
  forward,
} from 'effector'

import { sendEventToBack } from 'src/features/Player/api'

import { $presentation, PlayerGate, resetPlayer } from './index'

export const played = createEvent()
export const stopped = createEvent()
export const backwarded = createEvent()
const toBacked = createEvent()
export const forwarded = createEvent()
export const forwardedFromWidget = createEvent()
export const fullScreenEntered = createEvent()
export const fullScreenExited = createEvent()
export const muted = createEvent()
export const unmuted = createEvent()

export const $playing = createStore('initial')
  .on(played, () => 'play')
  .on(stopped, () => 'pause')
  .reset(resetPlayer)

export const $slideIndex = createStore(null)
  .on(merge([forwarded, toBacked]), (_, payload) => payload)
  .reset(resetPlayer)

export const $currentSlide = combine($presentation, $slideIndex, (pres, id) =>
  pres?.slides.find(slide => slide.SlideID === id)
)

export const $muted = createStore(false)
  .on(muted, () => true)
  .on(unmuted, () => false)
  .reset(resetPlayer)

export const $fullScreen = createStore(false)
  .on(fullScreenEntered, () => true)
  .on(fullScreenExited, () => false)
  .reset(resetPlayer)

export const $history = createStore([])
  .on(forwarded, (state, payload) => [...state, payload])
  .on(toBacked, state => [...state.slice(0, state.length - 1)])
  .reset(resetPlayer)

const $listOfControls = combine(
  $playing,
  $currentSlide,
  $history,
  $fullScreen,
  $muted,
  (playing, slide, history, fullScreen, isMuted) => ({
    playing,
    nextID: slide?.NextSlideID,
    history,
    fullScreen,
    isMuted,
  })
).map(({ playing, nextID, history, fullScreen, isMuted }) =>
  [
    history.length > 1 && { type: 'backward', event: backwarded },
    { type: playing, event: playing === 'pause' ? played : stopped },
    nextID != null && { type: 'forward', event: () => forwarded(nextID) },
    {
      type: isMuted ? 'mute' : 'volume',
      event: isMuted ? unmuted : muted,
    },
    {
      type: fullScreen ? 'fullScreenExit' : 'fullScreenEnter',
      event: fullScreen ? fullScreenExited : fullScreenEntered,
    },
  ].filter(Boolean)
)

const onLeft = ['backward', 'play', 'pause', 'forward']
const onRight = ['fullScreenExit', 'fullScreenEnter', 'mute', 'volume']

export const $leftControls = $listOfControls.map(state =>
  state.filter(({ type }) => onLeft.includes(type))
)

export const $rightControls = $listOfControls.map(state =>
  state.filter(({ type }) => onRight.includes(type))
)

sample({
  source: $history,
  clock: backwarded,
  fn: h => h[h.length - 2],
  target: toBacked,
})

const firstSlideSetted = sample({
  source: $presentation,
  clock: guard({
    source: sample($slideIndex, played),
    filter: index => index === null,
  }),
  fn: pres => pres.startId,
})

const slideFromURLSetted = sample({
  source: PlayerGate.state,
  clock: guard({
    source: PlayerGate.state,
    filter: state => Boolean(state.slide),
  }),
  fn: state => Number(state.slide),
})

$slideIndex.on(merge([firstSlideSetted, slideFromURLSetted]), (_, payload) => payload)
$history.on(firstSlideSetted, (state, payload) => [...state, payload])

const sendEvent = createEvent()
const fxSendEvent = createEffect({
  handler({ store, payload }) {
    return sendEventToBack({
      viewId: store.$presentation.viewId,
      widgetId: payload.widgetId,
      order: store.$eventCounter,
    })
  },
})

const $eventCounter = createStore(0).on(sendEvent, state => state + 1)

sample({
  source: {
    $presentation,
    $eventCounter,
  },
  clock: forwardedFromWidget,
  fn: (store, payload) => ({ store, payload }),
  target: sendEvent,
})

forward({ from: sendEvent, to: fxSendEvent })
forward({ from: forwardedFromWidget.map(({ slideId }) => slideId), to: forwarded })
