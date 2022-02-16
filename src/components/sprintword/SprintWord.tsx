import React, { FC } from 'react'
import { SprintWordProps } from '../../interfaces/sprint'

export const SprintWord: FC<SprintWordProps> = ({ word, answer }) => {
  return (
    <div className="word">
      <span className="word-english">{word}</span>
      <span className="answer">{answer}</span>
    </div>
  )
}
