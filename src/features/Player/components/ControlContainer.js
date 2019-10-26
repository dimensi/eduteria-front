import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useStore, useList } from 'effector-react'
import screenfull from 'screenfull'

import {
  played,
  $currentSlide,
  $playing,
  $history,
  $fullScreen,
  fullScreenEntered,
  fullScreenExited,
  $controls,
  $leftControls,
  $rightControls,
} from '../store/player'
import { ReactComponent as PlayIcon } from '../assets/play.svg'
import { ReactComponent as MuteIcon } from '../assets/mute.svg'
import { ReactComponent as VolumeIcon } from '../assets/volume.svg'
import { ReactComponent as ForwardIcon } from '../assets/forward.svg'
import { ReactComponent as BackwardIcon } from '../assets/backward.svg'
import { ReactComponent as PauseIcon } from '../assets/pause.svg'
import { ReactComponent as EnterFullScreenIcon } from '../assets/enter-fullscreen.svg'
import { ReactComponent as ExitFullScreenIcon } from '../assets/exit-fullscreen.svg'
import { WidgetRender } from './WidgetRender'

const Container = styled.div`
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  background: 'white';
  position: relative;
`

const AspectRationContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  width: 100%;
`

const WidgetHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const ControlsHolder = styled.div`
  position: absolute;
  padding: 20px 10px 5px;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
  z-index: 1;
  transform: translateY(100%);
  transition: 0.3s;
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;

  ${Container}:hover & {
    transform: translateY(0%);
  }
`

const ControlSide = css`
  display: flex;
  align-items: center;
  align-content: center;
`
const RightControlSide = styled.div`
  margin-left: auto;
  text-align: right;
`

const BigPlay = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 179, 255, 0.8);
  color: white;
  border-radius: 50%;
  padding: 10px 8px 8px 12px;
`

const Control = styled.button`
  background: transparent;
  padding: 0;
  width: 32px;
  height: 32px;
  color: white;
  border: none;
  padding: 6px;
  cursor: pointer;
  svg {
    fill: currentColor;
    width: 100%;
  }
  & + & {
    margin-left: 10px;
  }
`

const controls = {
  play: { Icon: PauseIcon },
  pause: { Icon: PlayIcon },
  forward: { Icon: ForwardIcon },
  backward: { Icon: BackwardIcon },
  fullScreenExit: { Icon: ExitFullScreenIcon },
  fullScreenEnter: { Icon: EnterFullScreenIcon },
}

const SideControls = ({ store }) =>
  useList(store, control => {
    const Icon = controls[control.type].Icon
    return (
      <Control onClick={control.event} key={control.type}>
        <Icon />
      </Control>
    )
  })
export function ControlContainer() {
  const contrainerRef = useRef(null)
  const slide = useStore($currentSlide)
  const playing = useStore($playing)
  const isInFullScreen = useStore($fullScreen)
  useEffect(() => {
    if (isInFullScreen && screenfull.isEnabled) {
      screenfull.request(contrainerRef.current)
    } else {
      screenfull.exit(contrainerRef.current)
    }
  }, [isInFullScreen])
  return (
    <Container style={{ background: playing !== 'initial' && 'black' }} ref={contrainerRef}>
      <AspectRationContainer>
        {slide?.Widgets && (
          <WidgetHolder>
            <WidgetRender widgets={slide.Widgets} />
          </WidgetHolder>
        )}
      </AspectRationContainer>
      {['pause', 'initial'].includes(playing) && (
        <Control css={BigPlay} onClick={played}>
          <PlayIcon />
        </Control>
      )}
      {playing !== 'initial' && (
        <ControlsHolder>
          <div css={ControlSide}>
            <SideControls store={$leftControls} />
          </div>
          <RightControlSide css={ControlSide}>
            <SideControls store={$rightControls} />
          </RightControlSide>
        </ControlsHolder>
      )}
    </Container>
  )
}
