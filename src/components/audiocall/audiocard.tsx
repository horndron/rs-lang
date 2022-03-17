import { useState, useEffect } from 'react'
import BUTTON_STYLES from '../../constants/buttons'
import { AUDIO_URL } from '../../constants/cardDataApi'
import Word from '../../interfaces/api'
import { ResultsGame, ResultsQuestionGame } from '../../interfaces/sprint'
import getChunkWords from '../APIs/api'
import FillHeart from '../../assets/svg/heart-solid.svg'
import BreakHeart from '../../assets/svg/heart-crack-solid.svg'
import AudioGame from '../../assets/svg/audio-game.svg'
import MUIButton from '../UI/MUIButton/MUIButton'
import { shuffleArr } from './audiocall'
import { SprintResult } from '../sprintresult/SprintResult'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { useActions } from '../../hooks/useActions'
import { useDispatch } from 'react-redux'
import { setOrUpdateUserWord } from '../../utils/utils'

interface IAudioCard {
  lives: number
  questions: Word[]
  setLives: React.Dispatch<React.SetStateAction<number>>
  setPrepareGame: React.Dispatch<React.SetStateAction<boolean>>
  generateQuestions: () => Promise<void>
}
interface IAudioExample {
  playGameAuido: (arg: Word) => void
  questions: Word[]
  count: number
}
interface ILives {
  lives: number
}
export const AudiocallCard: React.FC<IAudioCard> = ({
  lives,
  questions,
  setLives,
  setPrepareGame,
  generateQuestions,
}) => {
  const { bestSeriesAnswer, newWordsInGame } = useTypeSelector(
    (state) => state.words
  )
  const { SetBestSeriesAnswer } = useActions()
  const dispatch = useDispatch()
  const [answers, setAnswers] = useState<Word[]>([])
  const [count, setCount] = useState<number>(0)
  const [end, setEnd] = useState<boolean>(false)
  const [seriesAnswer, setSeriesAnswer] = useState(0)
  const [result, setResult] = useState<ResultsGame>({ true: [], false: [] })

  const addAnswerInResult = async (word: Word, answer: boolean) => {
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
      dispatch(SetBestSeriesAnswer(Math.max(bestSeriesAnswer, seriesAnswer)))

      if (answer) {
        setOrUpdateUserWord(
          userId,
          word.id,
          token,
          {
            trueAnswers: 1,
            seriallyAnswer: 1,
          },
          newWordsInGame,
          dispatch
        )
        setResult({ ...result, true: [...result.true, resultAnswer] })
      } else {
        setOrUpdateUserWord(
          userId,
          word.id,
          token,
          {
            trueAnswers: 0,
            seriallyAnswer: 0,
          },
          newWordsInGame,
          dispatch
        )
        setResult({ ...result, false: [...result.false, resultAnswer] })
      }
    }
  }

  const generateAnswers = async () => {
    const ansArr: Word[] = []
    ansArr.push(questions[count])
    while (ansArr.length < 4) {
      const randomGroup = Math.floor(Math.random() * 6)
      const randomPage = Math.floor(Math.random() * 30)
      const randomWord = Math.floor(Math.random() * 20)
      const chunckWords = await getChunkWords(randomGroup, randomPage)
      if (isAnswerExist(chunckWords[randomWord]?.id, ansArr)) {
        ansArr.push(chunckWords[randomWord])
      }
    }
    setAnswers(shuffleArr(ansArr))
  }
  const checkAnswer = (id: string) => {
    const currentWord = questions[count]
    if (id === questions[count].id) {
      setSeriesAnswer(seriesAnswer + 1)
      addAnswerInResult(currentWord, true)
    } else {
      setSeriesAnswer(0)
      addAnswerInResult(currentWord, false)
      setLives(lives - 1)
      if (lives - 1 < 1) {
        setEnd(true)
        return
      }
    }
    if (count + 1 > 19) {
      setEnd(true)
    } else {
      setCount(count + 1)
      playGameAuido(questions[count + 1])
    }
  }
  function playGameAuido(el: Word) {
    const path = `${el.audio.split('/')[1]}`
    try {
      const audio = new Audio(`${AUDIO_URL}/${path}`)
      audio.play()
    } catch (e) {
      console.log('Аудио файл не найден')
    }
  }
  const getGamesAgain = (): void => {
    setPrepareGame(true)
    setResult({ true: [], false: [] })
    setCount(0)
    setLives(5)
    generateQuestions()
  }
  document.onkeydown = checkKey

  function checkKey(e: KeyboardEvent): void {
    if (e.key == '1' && !end) {
      checkAnswer(answers[0].id)
    } else if (e.key == '2' && !end) {
      checkAnswer(answers[1].id)
    } else if (e.key == '3' && !end) {
      checkAnswer(answers[2].id)
    } else if (e.key == '4' && !end) {
      checkAnswer(answers[3].id)
    }
  }
  useEffect(() => {
    const audio = document.querySelector('.audio-example') as HTMLElement
    audio.click()
  }, [])
  useEffect(() => {
    generateAnswers()
  }, [count])

  return (
    <>
      <div className="word-card">
        {end ? (
          <SprintResult
            trueAnswer={result.true}
            falseAnswer={result.false}
            restartGame={getGamesAgain}
            isAudioGame={true}
          />
        ) : (
          <>
            <div className="word-card__top">
              <Lives lives={lives} />
              <AudioExample
                playGameAuido={playGameAuido}
                questions={questions}
                count={count}
              />
            </div>
            <div className="word-card__bottom">
              <div className="answers">
                {answers.map((el: Word, ind) => (
                  <MUIButton
                    key={`ans-${ind}-btn`}
                    name={`${ind + 1}. ${el.wordTranslate}`}
                    handler={() => {
                      checkAnswer(el.id)
                    }}
                    sx={{
                      ...BUTTON_STYLES.colorBorder,
                      height: 80,
                      width: 200,
                    }}
                  />
                ))}
              </div>
              <MUIButton
                name="Don't know"
                handler={() => {
                  checkAnswer('fail')
                }}
                sx={{ ...BUTTON_STYLES.falseAnswer }}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

const AudioExample: React.FC<IAudioExample> = ({
  playGameAuido,
  questions,
  count,
}) => {
  return (
    <>
      <button
        className="audio-example"
        onClick={() => {
          playGameAuido(questions[count])
        }}
      >
        <img alt="audio-example" src={AudioGame}></img>
      </button>
    </>
  )
}

const Lives: React.FC<ILives> = ({ lives }) => {
  const count = new Array(5).fill(0)
  return (
    <>
      <ul className="live-list">
        {count.map((val, ind) => {
          return (
            <li key={`heart-${ind}-attempt`}>
              {ind < lives ? (
                <img alt="heart-img" src={FillHeart}></img>
              ) : (
                <img alt="heart-img" src={BreakHeart}></img>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}

function isAnswerExist(id: string, arr: Word[]): boolean {
  arr.forEach((el: Word) => {
    if (el.id === id) return false
  })
  return true
}
