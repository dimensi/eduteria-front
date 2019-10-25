import { createEvent, combine, createStore, guard, sample, forward } from 'effector'

import { $presentation } from './index'

export const played = createEvent()
export const stopped = createEvent()
export const backwarded = createEvent()
const toBacked = createEvent()
export const forwarded = createEvent()

export const $playing = createStore('initial')
  .on(played, () => 'play')
  .on(stopped, () => 'pause')

export const $slideIndex = createStore(null).on(forwarded, (_, payload) => payload)

export const $currentSlide = combine($presentation, $slideIndex, (pres, id) =>
  pres?.slides.find(slide => slide.SlideID === id)
)

export const $history = createStore([])
  .on(forwarded, (state, payload) => [...state, payload])
  .on(toBacked, state => [...state.slice(0, state.length - 2)])

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
