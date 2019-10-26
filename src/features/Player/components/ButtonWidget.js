import React from 'react'
import styled from '@emotion/styled'

import { forwarded } from 'src/features/Player/store/player'

const Button = styled.button`
  position: absolute;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  font-family: inherit;
`

export function ButtonWidget({ WidgetName, NextSlideID, className }) {
  return (
    <Button className={className} children={WidgetName} onClick={() => forwarded(NextSlideID)} />
  )
}
