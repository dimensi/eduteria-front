import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { useStore } from 'effector-react'

import { $playing } from 'src/features/Player/store/player'

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
`

export function VideoWidget({ Source: { Src, ContentType }, WidgetID, className }) {
  const playing = useStore($playing)
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    if (playing === 'play') {
      ref.current.play()
    }
    if (playing === 'pause') {
      ref.current.pause()
    }
  }, [playing])
  return (
    <Video controls={false} key={WidgetID} className={className} ref={ref}>
      <source src={Src} type={ContentType} />
    </Video>
  )
}
