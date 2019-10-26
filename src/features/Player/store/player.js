import { createEvent, combine, createStore, guard, sample, forward } from 'effector'

import { $presentation } from './index'

export const played = createEvent()
export const stopped = createEvent()
export const backwarded = createEvent()
const toBacked = createEvent()
export const forwarded = createEvent()
export const fullScreenEntered = createEvent()
export const fullScreenExited = createEvent()

export const $playing = createStore('initial')
  .on(played, () => 'play')
  .on(stopped, () => 'pause')

export const $slideIndex = createStore(null).on(forwarded, (_, payload) => payload)

export const $currentSlide = combine($presentation, $slideIndex, (pres, id) =>
  pres?.slides.find(slide => slide.SlideID === id)
)

export const $fullScreen = createStore(false)
  .on(fullScreenEntered, () => true)
  .on(fullScreenExited, () => false)

export const $history = createStore([])
  .on(forwarded, (state, payload) => [...state, payload])
  .on(toBacked, state => [...state.slice(0, state.length - 2)])

const $listOfControls = combine(
  $playing,
  $currentSlide,
  $history,
  $fullScreen,
  (playing, slide, history, fullScreen) => ({
    playing,
    nextID: slide?.NextSlideID,
    history,
    fullScreen,
  })
).map(({ playing, nextID, history, fullScreen }) =>
  [
    history.length > 1 && { type: 'backward', event: backwarded },
    { type: playing, event: playing === 'pause' ? played : stopped },
    nextID != null && { type: 'forward', event: () => forwarded(nextID) },
    {
      type: fullScreen ? 'fullScreenExit' : 'fullScreenEnter',
      event: fullScreen ? fullScreenExited : fullScreenEntered,
    },
  ].filter(Boolean)
)

const onLeft = ['backward', 'play', 'pause', 'forward']
const onRight = ['fullScreenExit', 'fullScreenEnter']

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

forward({ from: toBacked, to: forwarded })

sample({
  source: $presentation,
  clock: guard({
    source: sample($slideIndex, played),
    filter: index => index === null,
  }),
  fn: pres => pres.startId,
  target: forwarded,
})
