import React, { FC } from 'react'
import { CountdownCircleTimer, Props } from 'react-countdown-circle-timer'

export const CircleTimer: FC<Props> = (props) => {
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={props.duration}
        colors={props.colors}
        colorsTime={props.colorsTime}
        onComplete={props.onComplete}
        initialRemainingTime={props.initialRemainingTime}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  )
}
