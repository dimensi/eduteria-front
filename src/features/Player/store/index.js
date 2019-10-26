import { createGate } from 'effector-react'
import { createEffect, createStore, createEvent, forward, createStoreObject, merge } from 'effector'

import { getPresentation } from 'src/features/Player/api'

const resetPlayer = createEvent()
export const PlayerGate = createGate('gate for player')
const fxGetPresentation = createEffect().use(getPresentation)

const mapResult = (_, { result }) => ({
  id: result.PresentationID,
  name: result.PresentationName,
  slides: result.Slides,
  startId: result.StartSlideID,
})

export const $presentation = createStore(null)
  .on(fxGetPresentation.done, mapResult)
  .reset(resetPlayer)

const $loading = createStore(true)
  .on(fxGetPresentation, () => true)
  .on(merge([fxGetPresentation.done, fxGetPresentation.fail]), () => false)

export const $presentationStore = createStoreObject({
  presentation: $presentation,
  loading: $loading,
})
forward({ from: PlayerGate.state, to: fxGetPresentation })
forward({ from: PlayerGate.close, to: resetPlayer })
