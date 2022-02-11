import React, { FC } from 'react'
import { SprintWordProps } from '../../interfaces/sprint'

export const SprintWord: FC<SprintWordProps> = ({ word, answer }) => {
  return (
    <div className="word">
      <h3>{word}</h3>
      <div className="answer">{answer}</div>
    </div>
  )
}
