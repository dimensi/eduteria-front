import React from 'react'
import { Layout, PageHeader } from 'antd'
import styled from '@emotion/styled'

import { AspectRationContainer } from 'src/features/Player/components/ControlContainer'

const Container = styled.section`
  padding: 10px;
  padding-top: 60px;
`
const Iframe = styled.iframe`
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
export function VideoPage({
  match: {
    params: { id },
  },
}) {
  return (
    <Layout>
      <PageHeader title={`Видео ID ${id}`} />
      <Container>
        <AspectRationContainer>
          <Iframe src={`/play/${id}`} frameBorder='0' />
        </AspectRationContainer>
      </Container>
    </Layout>
  )
}
