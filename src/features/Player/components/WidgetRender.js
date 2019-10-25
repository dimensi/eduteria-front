import React from 'react'

import { VideoWidget } from './VideoWidget'

const mapWidgets = {
  Video: VideoWidget,
}

const getCSS = ({ Top, Left, Height, Width, Visible, ZIndex }) => ({
  top: Top + '%',
  left: Left + '%',
  height: Height + '%',
  width: Width + '%',
  zIndex: ZIndex,
})

export function WidgetRender({ widgets }) {
  return widgets.map(widget => {
    const Tag = mapWidgets[widget.WidgetType]
    if (!Tag) return <div key={widget.WidgetID}>hi</div>
    return <Tag key={widget.WidgetID} {...widget} css={getCSS(widget)} />
  })
}
