import React from 'react'
import styled from '@emotion/styled'

import { forwardedFromWidget } from 'src/features/Player/store/player'

const Button = styled.button`
  position: absolute;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  font-family: inherit;
  line-height: 1;
`

export function ButtonWidget({ WidgetName, WidgetID, NextSlideID, className }) {
  return (
    <Button
      className={className}
      children={WidgetName}
      onClick={() => forwardedFromWidget({ slideId: NextSlideID, widgetId: WidgetID })}
    />
  )
}
