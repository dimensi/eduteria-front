import React from 'react'
import css from '@emotion/css'

import { ButtonWidget } from 'src/features/Player/components/ButtonWidget'

import { VideoWidget } from './VideoWidget'

const mapWidgets = {
  Video: VideoWidget,
  Button: ButtonWidget,
}

export function WidgetRender({ widgets, playState }) {
  return widgets.map(widget => {
    const Tag = mapWidgets[widget.WidgetType]
    if (!Tag) return null
    if (playState === 'initial' && widget.WidgetType !== 'Video') return null
    return <Tag key={widget.WidgetID} {...widget} css={css(widget.Css)} />
  })
}
