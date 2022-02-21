import { Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { getChunkWords } from '../../components/APIs/api'
import { CircleTimer } from '../../components/circletimer/CircleTimer'
import { PreperaGame } from '../../components/preperagame/PreperaGame'
import { SprintResult } from '../../components/sprintresult/SprintResult'
import { SprintWord } from '../../components/sprintword/SprintWord'
import MUIButton from '../../components/UI/MUIButton/MUIButton'
import BUTTON_STYLES from '../../constants/buttons'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { Word } from '../../interfaces/api'
import { ResultsGame, ResultsQuestionGame } from '../../interfaces/sprint'
import {
  setOrUpdateUserWord,
  setRandomNumber,
  threeRandomPageWords,
} from '../../utils/utils'
import '../sprint/sprint.styles.sass'

export const Sprint: FC = () => {
  const { level } = useTypeSelector((state) => state.words)
  const getWords = async (level: number) => {
    const words: Word[] = []
    const pages = threeRandomPageWords()
    pages.forEach(async (page) => {
      const wordsPage1 = await getChunkWords(level, page)
      words.push(...(wordsPage1 as Word[]))
      setWords(words)
    })
  }
  const [result, setResult] = useState<ResultsGame>({ true: [], false: [] })
  const [preperaGame, setPreperaGame] = useState(true)
  const [words, setWords] = useState<Word[]>([])
  const [length, setLength] = useState(0)
  const [score, setScore] = useState({ total: 0, seriesTrueAnswers: 0 })
  let answer = ''
  let bestSeriesAnswer = 0
  // let newWordsInGame = 0
  const startGame = () => {
    setPreperaGame(false)
  }
  const wordTranslate = (): string => {
    const answerVariant = setRandomNumber()
    answer =
      answerVariant === 1
        ? words[length].wordTranslate
        : words[setRandomNumber(words.length - 1)].wordTranslate
    return answer
  }

  const addAnswerInResult = (word: Word, answer: boolean): void => {
    const resultAnswer: ResultsQuestionGame = {
      wordId: word.id,
      audio: word.audio,
      word: word.word,
      wordTranslate: word.wordTranslate,
      answer: answer,
    }

    if (localStorage.getItem('token') && localStorage.getItem('userId')) {
      const userId = localStorage.getItem('userId') as string
      const token = localStorage.getItem('token') as string
      bestSeriesAnswer = Math.max(bestSeriesAnswer, score.seriesTrueAnswers)

      if (answer) {
        setOrUpdateUserWord(userId, word.id, token, {
          trueAnswers: 1,
          seriallyAnswer: 1,
        })
        setResult({ ...result, true: [...result.true, resultAnswer] })
      } else {
        setOrUpdateUserWord(userId, word.id, token, {
          trueAnswers: 0,
          seriallyAnswer: 0,
        })
        setResult({ ...result, false: [...result.false, resultAnswer] })
      }
    }
  }

  const getScoreMultiply = (): number => {
    let multiply = 1
    if (score.seriesTrueAnswers > 9) {
      multiply = 8
    } else if (score.seriesTrueAnswers > 6) {
      multiply = 4
    } else if (score.seriesTrueAnswers > 3) {
      multiply = 2
    }

    return multiply
  }

  const setTotalScore = (answer: boolean): void => {
    answer
      ? setScore({
          total: score.total + 10 * getScoreMultiply(),
          seriesTrueAnswers: score.seriesTrueAnswers + 1,
        })
      : setScore({ ...score, seriesTrueAnswers: 0 })
  }

  const falseBtn = () => {
    const currentWord = words[length]
    const trueOrFalse = currentWord.wordTranslate !== answer
    setTotalScore(trueOrFalse)
    addAnswerInResult(currentWord, trueOrFalse)
    setLength(length + 1)
  }

  const trueBtn = () => {
    const currentWord = words[length]
    const trueOrFalse = currentWord.wordTranslate === answer
    setTotalScore(trueOrFalse)
    addAnswerInResult(currentWord, trueOrFalse)
    setLength(length + 1)
  }

  const getGamesAgain = (): void => {
    setPreperaGame(true)
    setScore({ total: 0, seriesTrueAnswers: 0 })
    setResult({ true: [], false: [] })
    setLength(0)
  }

  const isTimeOver = (): void => {
    setLength(60)
  }

  document.onkeydown = checkKey

  function checkKey(e: KeyboardEvent): void {
    if (e.key == 'ArrowLeft' && length < words.length) {
      falseBtn()
    } else if (e.key == 'ArrowRight' && length < words.length) {
      trueBtn()
    }
  }

  useEffect(() => {
    getWords(level)
  }, [level])

  return (
    <div className="sprint-game">
      <Typography component="div">
        <div className="sprint-container">
          {preperaGame ? (
            <PreperaGame handler={startGame} />
          ) : length < words.length ? (
            <div className="word-card">
              <div className="head">
                <div className="top">
                  <h2 className="score">Счет: {score.total}</h2>
                  <CircleTimer
                    duration={60}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[45, 30, 15, 0]}
                    onComplete={isTimeOver}
                    size={50}
                    strokeWidth={6}
                  />
                </div>
                <div
                  className={
                    'series-answers series--' + score.seriesTrueAnswers
                  }
                >
                  <span className="item item-1"></span>
                  <span className="item item-2"></span>
                  <span className="item item-3"></span>
                </div>
              </div>
              <SprintWord word={words[length].word} answer={wordTranslate()} />

              <div className="answers-btn">
                <MUIButton
                  name="Неверно"
                  handler={falseBtn}
                  sx={{ ...BUTTON_STYLES.falseAnswer }}
                />
                <MUIButton
                  name="Верно"
                  handler={trueBtn}
                  sx={{ ...BUTTON_STYLES.trueAnswer }}
                />
              </div>
            </div>
          ) : (
            <SprintResult
              trueAnswer={result.true}
              falseAnswer={result.false}
              score={score.total}
              restartGame={getGamesAgain}
            />
          )}
        </div>
      </Typography>
    </div>
  )
}
