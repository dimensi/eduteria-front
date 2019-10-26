import React from 'react'
import { useStore } from 'effector-react'

import { PlayerGate, $presentationStore } from 'src/features/Player/store'

import { ControlContainer } from './components/ControlContainer'

export function Player({
  match: {
    params: { id },
  },
}) {
  const store = useStore($presentationStore)
  console.log(store)
  return (
    <>
      <PlayerGate id={id} />
      {!store.loading && store.presentation && <ControlContainer />}
    </>
  )
}
