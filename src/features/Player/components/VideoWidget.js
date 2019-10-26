import React, { useRef, useLayoutEffect } from 'react'
import styled from '@emotion/styled'
import { useStore } from 'effector-react'

import { $playing, $muted } from 'src/features/Player/store/player'

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
`

export function VideoWidget({ Source: { Src, ContentType }, WidgetID, className }) {
  const playing = useStore($playing)
  const isMuted = useStore($muted)
  const ref = useRef(null)
  const promise = useRef(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    if (playing === 'play' && ref.current.paused) {
      promise.current = ref.current.play()
      promise.current.then(() => {
        promise.current = null
      })
    }
    if (playing === 'pause' && !ref.current.paused) {
      if (promise.current) {
        promise.current.then(() => {
          promise.current = null
          ref.current.pause()
        })
      } else {
        ref.current.pause()
      }
    }
    ref.current.muted = isMuted
  }, [playing, isMuted])
  return (
    <Video controls={false} key={WidgetID} className={className} ref={ref} playsInline>
      <source src={Src} type={ContentType} />
    </Video>
  )
}
