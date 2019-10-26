import React from 'react'
import css from '@emotion/css'

import { ButtonWidget } from 'src/features/Player/components/ButtonWidget'

import { VideoWidget } from './VideoWidget'

const mapWidgets = {
  Video: VideoWidget,
  Button: ButtonWidget,
}

export function WidgetRender({ widgets }) {
  return widgets.map(widget => {
    const Tag = mapWidgets[widget.WidgetType]
    if (!Tag) return <div key={widget.WidgetID}>hi</div>
    return <Tag key={widget.WidgetID} {...widget} css={css(widget.Css)} />
  })
}
