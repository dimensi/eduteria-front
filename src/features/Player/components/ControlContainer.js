import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { ReactComponent as PlayIcon } from '../assets/play.svg'
import { ReactComponent as MuteIcon } from '../assets/mute.svg'
import { ReactComponent as VolumeIcon } from '../assets/volume.svg'
import { ReactComponent as ForwardIcon } from '../assets/forward.svg'
import { ReactComponent as BackwardIcon } from '../assets/backward.svg'

const Container = styled.div`
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  background: white;
  padding-top: 53%;
  position: relative;
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
  /* transform: translateY(100%); */
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
  padding: 10px;
`

const Control = styled.button`
  background: transparent;
  padding: 0;
  width: 32px;
  height: 32px;
  color: white;
  border: none;
  padding: 6px;
  svg {
    fill: currentColor;
    width: 100%;
  }
  & + & {
    margin-left: 10px;
  }
`

const controls = [
  { id: 'play', icon: PlayIcon },
  { id: 'mute', icon: MuteIcon },
  { id: 'forward', icon: ForwardIcon },
  { id: 'backward', icon: BackwardIcon },
]

export function ControlContainer() {
  const [firstStart, setFirstStart] = useState(true)
  return (
    <Container>
      <WidgetHolder>hi</WidgetHolder>
      <Control css={BigPlay}>
        <PlayIcon />
      </Control>
      {firstStart && (
        <ControlsHolder>
          <div css={ControlSide}>
            <Control>
              <BackwardIcon />
            </Control>
            <Control>
              <PlayIcon />
            </Control>
            <Control>
              <ForwardIcon />
            </Control>
          </div>
          <RightControlSide css={ControlSide}>
            <Control>
              <VolumeIcon />
            </Control>
          </RightControlSide>
        </ControlsHolder>
      )}
    </Container>
  )
}
