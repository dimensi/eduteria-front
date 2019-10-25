import { createGate } from 'effector-react'
import { createEffect, createStore, createEvent, forward, createStoreObject } from 'effector'

import { getPresentation } from 'src/features/Player/api'

const resetPlayer = createEvent()
export const PlayerGate = createGate('gate for player')
const fxGetPresentation = createEffect().use(getPresentation)
const $presentation = createStore(null)
  .on(fxGetPresentation.done, (_, { result }) => result)
  .reset(resetPlayer)

const $loading = createStore(true)
  .on(fxGetPresentation, () => true)
  .on(fxGetPresentation.finally, () => false)

export const $presentationStore = createStoreObject({
  slides: $presentation.map(state => state?.Slides),
  name: $presentation.map(state => state?.PresentationName),
  loading: $loading,
})
forward({ from: PlayerGate.state, to: fxGetPresentation })
forward({ from: PlayerGate.close, to: resetPlayer })
