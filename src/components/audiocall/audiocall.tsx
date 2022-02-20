import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PreperaGame } from '../preperagame/PreperaGame'
import { Word } from '../../interfaces/api'
import './audiocall.style.scss'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { getChunkWords } from '../APIs/api'
import { AudiocallCard } from './audiocard'

export const Audiocall: React.FC = () => {
  const { level, page } = useTypeSelector((state) => state.words)
  const [questions, setQuestions] = useState<Word[]>([])
  const [preperaGame, setPreperaGame] = useState<boolean>(true)
  const [lives, setLives] = useState(5)

  const startGame = () => {
    setPreperaGame(false)
  }
  async function generateQuestions() {
    await getChunkWords(level, page).then((res) => {
      const arr = res
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
                setPreperaGame={setPreperaGame}
              />
            )}
          </div>
        </Typography>
      </div>
    </>
  )
}

export function shuffleArr(array: Word[]): Word[] {
  return array.sort(() => Math.random() - 0.5)
}
