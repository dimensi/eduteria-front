/* eslint-disable react/jsx-handler-names */
import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/core'
import { useStore, useList } from 'effector-react'
import screenfull from 'screenfull'

import {
  played,
  $currentSlide,
  $playing,
  $fullScreen,
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
  background: white;
  position: relative;
  overflow: hidden;
  display: flex;
  align-content: center;
`

const fullScreen = css`
  width: 100%;
  height: 100%;
`

export const AspectRationContainer = styled.div`
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
  background-color: rgba(0, 179, 255, 0.8);
  color: white;
  border-radius: 50%;
  @media (min-width: 701px) {
    width: 50px;
    height: 50px;
    padding: 10px 8px 8px 12px;
  }
  @media (max-width: 700px) {
    width: 50px;
    height: 50px;
    padding: 10px 8px 8px 12px;
  }
`

const BigPlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
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
  mute: { Icon: MuteIcon },
  volume: { Icon: VolumeIcon },
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
    if (!contrainerRef.current) return
    if (isInFullScreen && screenfull.isEnabled) {
      screenfull.request(contrainerRef.current)
    }
    if (!isInFullScreen && screenfull.isEnabled) {
      screenfull.exit()
    }
  }, [isInFullScreen])
  console.log('current slide', slide, playing)
  return (
    <Container
      style={{ background: playing !== 'initial' && 'black' }}
      css={isInFullScreen && !screenfull.isEnabled ? fullScreen : undefined}
      ref={contrainerRef}
    >
      {isInFullScreen && !screenfull.isEnabled && (
        <Global
          styles={css`
            html,
            body,
            #root {
              height: 100%;
              width: 100%;
            }
          `}
        />
      )}
      <AspectRationContainer>
        {slide?.Widgets && (
          <WidgetHolder>
            <WidgetRender widgets={slide.Widgets} playState={playing} />
          </WidgetHolder>
        )}
      </AspectRationContainer>
      {['pause', 'initial'].includes(playing) && (
        <BigPlayContainer onClick={played}>
          <Control css={BigPlay}>
            <PlayIcon />
          </Control>
        </BigPlayContainer>
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
