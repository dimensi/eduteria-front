import React from 'react'
import css from '@emotion/css'

import { VideoWidget } from './VideoWidget'

const mapWidgets = {
  Video: VideoWidget,
}

export function WidgetRender({ widgets }) {
  return widgets.map(widget => {
    const Tag = mapWidgets[widget.WidgetType]
    if (!Tag) return <div key={widget.WidgetID}>hi</div>
    return <Tag key={widget.WidgetID} {...widget} css={css(widget.Css)} />
  })
}
