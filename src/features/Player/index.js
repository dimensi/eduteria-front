import React from 'react'
import { useStore } from 'effector-react'

import { PlayerGate, $presentationStore } from 'src/features/Player/store'

import { ControlContainer } from './components/ControlContainer'

export function Player({
  match: {
    params: { id },
  },
  location: { search },
}) {
  const store = useStore($presentationStore)
  const query = Object.fromEntries(new URLSearchParams(search))
  return (
    <>
      <PlayerGate id={id} {...query} />
      {!store.loading && store.presentation && <ControlContainer />}
    </>
  )
}
