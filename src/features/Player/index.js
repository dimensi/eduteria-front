import React from 'react'
import { useStore } from 'effector-react'
import { Layout, PageHeader } from 'antd'
import styled from '@emotion/styled'

import { PlayerGate, $presentationStore } from 'src/features/Player/store'

import { ControlContainer } from './components/ControlContainer'

const Wrapper = styled.div`
  padding: 10px;
  padding-top: 60px;
`

export function Player({
  match: {
    params: { id },
  },
}) {
  const store = useStore($presentationStore)
  console.log(store)
  return (
    <Layout.Content>
      <PlayerGate id={id} />
      {!store.loading && store.presentation && (
        <>
          <PageHeader
            css={{
              border: '1px solid rgb(235, 237, 240)',
            }}
            title={store.presentation.name}
          />
          <Wrapper>
            <ControlContainer />
          </Wrapper>
        </>
      )}
    </Layout.Content>
  )
}
