import React, { FC, useEffect, useState } from 'react'
import { getChunkWords } from '../components/APIs/api'
import { CircleTimer } from '../components/circletimer/CircleTimer'
import { PreperaGame } from '../components/preperagame/PreperaGame'
import { SprintResult } from '../components/sprintresult/SprintResult'
import { SprintWord } from '../components/sprintword/SprintWord'
import MUIButton from '../components/UI/MUIButton/MUIButton'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { Word } from '../interfaces/api'
import { ResultsGame, ResultsQuestionGame } from '../interfaces/sprint'
import { setRandomNumber, threeRandomPageWords } from '../utils/utils'
import '../sprint.styles.sass'
import BUTTON_STYLES from '../constants/buttons'
import { Typography } from '@mui/material'

export const Sprint: FC = () => {
  const group = useTypeSelector((state) => state.words.group)
  const getWords = async (group: number) => {
    const words: Word[] = []
    const pages = threeRandomPageWords()
    const wordsPage1 = await getChunkWords(group, pages[0])
    const wordsPage2 = await getChunkWords(group, pages[1])
    const wordsPage3 = await getChunkWords(group, pages[2])
    words.push(...(wordsPage1 as Word[]))
    words.push(...(wordsPage2 as Word[]))
    words.push(...(wordsPage3 as Word[]))
    setWords(words)
  }

  const [result, setResult] = useState({ true: [], false: [] } as ResultsGame)
  const [preperaGame, setPreperaGame] = useState(true)
  const [words, setWords] = useState([] as Word[])
  const [length, setLength] = useState(0)
  const [score, setScore] = useState({ total: 0, seriesTrueAnswers: 0 })
  let answer = ''
  const startGame = () => {
    setPreperaGame(false)
  }
  const wordTranslate = (): string => {
    const answerVariant = setRandomNumber()
    answer =
      answerVariant === 1
        ? words[length].wordTranslate
        : words[setRandomNumber(59)].wordTranslate
    return answer
  }

  const addAnswerInResult = (word: Word, answer: boolean): void => {
    const resultAnswer: ResultsQuestionGame = {
      wordId: word.id,
      userId: 'string_USER_ID',
      audio: word.audio,
      word: word.word,
      wordTranslate: word.wordTranslate,
      answer: answer,
    }
    answer
      ? setResult({ ...result, true: [...result.true, resultAnswer] })
      : setResult({ ...result, false: [...result.false, resultAnswer] })
  }

  const getScoreЬultiply = (): number => {
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
          total: score.total + 10 * getScoreЬultiply(),
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
    setLength(0)
  }

  const isTimeOver = (): void => {
    setLength(60)
  }

  useEffect(() => {
    getWords(group)
  }, [group])

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
