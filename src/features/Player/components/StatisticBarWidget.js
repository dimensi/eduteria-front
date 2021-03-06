import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  position: absolute;
  flex-flow: column;
`
const BarContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
`
const BarLine = styled.div`
  width: 100%;
  height: 100%;
`

const BarTitle = styled.div`
  font-size: inherit;
  color: currentColor;
  position: relative;
  margin-bottom: 0.3em;
  flex: 0 0 auto;
`

const colors = [
  '#e74c3c',
  '#f1a9a0',
  '#9a12b3',
  '#19b5fe',
  '#4daf7c',
  '#1f3a93',
  '#f7ca18',
  '#f0f0d6',
  '#fabe58',
  '#2e3131',
  '#abb7b7',
]

export function StatisticBarWidget({ WidgetName, Percent, className, index }) {
  return (
    <Container className={className}>
      <BarTitle>{WidgetName}</BarTitle>
      <BarContainer>
        <BarLine
          style={{
            backgroundColor: colors[index % colors.length],
            transform: `translateX(${Percent - 100}%)`,
          }}
        />
      </BarContainer>
    </Container>
  )
}

/**
 * Css: "top: 30%;
↵left: 6%;
↵height: 10%;
↵width: 40%;
↵z-index: 2147483647;
↵font-size: 2vw;
↵line-height: 1;
↵border: 3px solid transparent;
↵transition: border 0.3s;
↵border-radius: 5px;
↵&:hover {
↵   border-color: #ffeb3b;
↵}"
WidgetID: 663086
WidgetName: "буду учителем китайского языка"
WidgetType: "Statistics"
 */
