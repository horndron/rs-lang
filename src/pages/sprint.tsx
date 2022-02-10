import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getChunkWords } from '../components/APIs/api'
import { CircleTimer } from '../components/circletimer/CircleTimer'
import { PreperaGame } from '../components/preperagame/PreperaGame'
import { SprintWord } from '../components/sprintword/SprintWord'
import MUIButton from '../components/UI/MUIButton/MUIButton'
import { Word } from '../interfaces/api'
import { RootState } from '../store'
import { setRandomNumber, threeRandomPageWords } from '../utils/utils'

export const Sprint: FC = () => {
  const result = []
  const [preperaGame, setPreperaGame] = useState(true)
  const startGame = () => {
    setPreperaGame(false)
  }
  const [words, setWords] = useState([] as Word[])
  const [length, setLength] = useState(0)
  const group = useSelector((state: RootState) => state.page.group)
  const getWords = async (group: number) => {
    const result: Word[] = []
    const pages = threeRandomPageWords()
    const wordsPage1 = await getChunkWords(group, pages[0])
    const wordsPage2 = await getChunkWords(group, pages[1])
    const wordsPage3 = await getChunkWords(group, pages[2])
    result.push(...(wordsPage1 as Word[]))
    result.push(...(wordsPage2 as Word[]))
    result.push(...(wordsPage3 as Word[]))
    setWords(result)
  }
  let answer = setRandomNumber()
  const wordTranslate = (): string => {
    const result: string =
      answer === 1
        ? words[length].wordTranslate
        : words[setRandomNumber(59)].wordTranslate
    answer = setRandomNumber()
    return result
  }
  const nextWord = () => {
    const currentWord = words[length]
    console.log(currentWord)
    result.push(currentWord)
    setLength(length + 1)
  }

  useEffect(() => {
    getWords(group)
  }, [group])

  return (
    <div>
      Игра Спринт
      {preperaGame ? (
        <PreperaGame handler={startGame} />
      ) : (
        <div>
          <CircleTimer
            duration={60}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[45, 30, 15, 0]}
            onComplete={() => console.log('finished')}
          />
          <SprintWord word={words[length].word} answer={wordTranslate()} />

          <div className="answers-btn">
            <MUIButton name="Верно" handler={nextWord} />
            <MUIButton name="Неверно" handler={nextWord} />
          </div>
        </div>
      )}
    </div>
  )
}
