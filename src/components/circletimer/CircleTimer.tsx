import React, { FC } from 'react'
import { CountdownCircleTimer, Props } from 'react-countdown-circle-timer'

export const CircleTimer: FC<Props> = (props) => {
  return (
    <div className="timer">
      <CountdownCircleTimer
        isPlaying
        duration={props.duration}
        colors={props.colors}
        colorsTime={props.colorsTime}
        onComplete={props.onComplete}
        initialRemainingTime={props.initialRemainingTime}
        size={props.size}
        strokeWidth={props.strokeWidth}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  )
}
