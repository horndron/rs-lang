import React, { FC } from 'react'
import { PreperaGameProps } from '../../interfaces/sprint'
import { CircleTimer } from '../circletimer/CircleTimer'

export const PreperaGame: FC<PreperaGameProps> = ({ handler }) => {
  return (
    <div>
      <CircleTimer
        duration={1}
        colors={['#004777', '#F7B801']}
        colorsTime={[3, 0]}
        onComplete={handler}
        size={70}
        strokeWidth={7}
      />
    </div>
  )
}
