import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { PreperaGame } from '../preperagame/PreperaGame'
import { Word } from '../../interfaces/api'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { getChunkWords } from '../APIs/api'
import { AudiocallCard } from './audiocard'
import './audiocall.style.scss'

export const Audiocall: React.FC = () => {
  const { level, page } = useTypeSelector((state) => state.words)
  const [questions, setQuestions] = useState<Word[]>([])
  const [preperaGame, setPrepareGame] = useState<boolean>(true)
  const [lives, setLives] = useState<number>(5)

  const startGame = () => {
    setPrepareGame(false)
  }

  async function generateQuestions() {
    await getChunkWords(level, page).then((res: Word[]) => {
      const arr: Word[] | void = res
      setQuestions(shuffleArr(arr))
    })
  }

  useEffect(() => {
    generateQuestions()
  }, [])
  return (
    <>
      <div className="audiocall-game">
        <Typography component="div">
          <div className="audiocall-container">
            {preperaGame ? (
              <PreperaGame handler={startGame} />
            ) : (
              <AudiocallCard
                lives={lives}
                questions={questions}
                setLives={setLives}
                setPrepareGame={setPrepareGame}
                generateQuestions={generateQuestions}
              />
            )}
          </div>
        </Typography>
      </div>
    </>
  )
}

export function shuffleArr(array: Word[] = []): Word[] {
  if (array instanceof Object) {
    return array.sort(() => Math.random() - 0.5)
  }
  return []
}
