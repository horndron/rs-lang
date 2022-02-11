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

  const falseBtn = () => {
    const currentWord = words[length]
    console.log(words)
    console.log(length)
    const trueOrFalse = currentWord.wordTranslate !== answer
    addAnswerInResult(currentWord, trueOrFalse)
    setLength(length + 1)
  }

  const trueBtn = () => {
    const currentWord = words[length]
    const trueOrFalse = currentWord.wordTranslate === answer
    addAnswerInResult(currentWord, trueOrFalse)
    setLength(length + 1)
  }

  const isTimeOver = (): void => {
    setLength(60)
  }

  useEffect(() => {
    getWords(group)
  }, [group])

  return (
    <div className="sprint-game">
      <div className="sprint-container">
        {preperaGame ? (
          <PreperaGame handler={startGame} />
        ) : length < words.length ? (
          <div className="word-card">
            <CircleTimer
              duration={60}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[45, 30, 15, 0]}
              onComplete={isTimeOver}
              size={60}
              strokeWidth={7}
            />
            <SprintWord word={words[length].word} answer={wordTranslate()} />

            <div className="answers-btn">
              <MUIButton name="Неверно" handler={falseBtn} />
              <MUIButton name="Верно" handler={trueBtn} />
            </div>
          </div>
        ) : (
          <SprintResult trueAnswer={result.true} falseAnswer={result.false} />
        )}
      </div>
    </div>
  )
}
