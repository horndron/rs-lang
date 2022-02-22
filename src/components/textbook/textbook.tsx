import React, { useEffect } from 'react'
import { AUDIO_URL, GROUP_COLOR, IMAGE_URL } from '../../constants/cardDataApi'
import { useActions } from '../../hooks/useActions'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { UserWord, Word } from '../../interfaces/api'
import { WordSettings } from './settings'
import AudioImg from '../../assets/svg/auido.svg'
import InfoImg from '../../assets/svg/info-solid.svg'
import ExampleImg from '../../assets/svg/book-open-solid.svg'
import BoltIcon from '../../assets/svg/bolt-solid.svg'
import LearnIcon from '../../assets/svg/graduation-cap-solid.svg'
import TrashIcon from '../../assets/svg/trash-can-solid.svg'
import './textbook.style.scss'
import { createUserWord, getUserWord, updateUserWord } from '../APIs/api'
import { isAuth } from '../../auth/auth'

interface ICard {
  card: Word
  group: number
  isHardGroup: boolean
  getHardWords: () => void
}

export const TextbookPage: React.FC = () => {
  const { words, loading, error, page, group } = useTypeSelector(
    (state) => state.words
  )

  const { fetchWords, SetFromTextbook } = useActions()
  useEffect(() => {
    fetchWords(group, page)
  }, [page, group])

  useEffect(() => {
    SetFromTextbook(true)
  }, [])

  if (loading) {
    return <h2>Идет загрузка...</h2>
  }
  if (error) {
    return <h2>{error}</h2>
  }
  return (
    <>
      <div className="container words-container">
        {words.map((card: Word) => (
          <WordCard
            key={card.id}
            card={card}
            group={group}
            isHardGroup={false}
            getHardWords={() => {
              console.log('Заглушка')
            }}
          />
        ))}
        <WordSettings />
      </div>
    </>
  )
}

export const WordCard: React.FC<ICard> = ({
  card,
  group,
  isHardGroup,
  getHardWords,
}) => {
  const image = `${IMAGE_URL}/${card.image.split('/')[1]}`
  const audioPath = `${card.audio.split('/')[1]}`
  const meanPath = `${card.audioMeaning.split('/')[1]}`
  const examplePath = `${card.audioExample.split('/')[1]}`
  const color = GROUP_COLOR[group]
  let userID: string
  let token: string
  if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    userID = localStorage.getItem('userId') as string
    token = localStorage.getItem('token') as string
  }
  const removeHardWord = async () => {
    if (!isAuth()) {
      window.location.href = '/'
    }
    try {
      const word = await getUserWord(userID, card._id as string, token)
      console.log(word, 'remove hard word')
      await updateUserWord(userID, card._id as string, token, {
        difficulty: 'easy',
        optional: { ...(word as UserWord).optional },
      })
      getHardWords()
    } catch (e) {
      console.log(e)
    }
  }

  const addHardWord = async () => {
    if (!isAuth()) {
      window.location.reload()
    }
    try {
      const word = await getUserWord(userID, card.id, token)
      console.log(word, 'add hard word')
      if (word.status === 200) {
        await updateUserWord(userID, card.id, token, {
          difficulty: 'hard',
          optional: { ...(word as UserWord).optional },
        })
      } else if (word.status === 404) {
        await createUserWord(userID, card.id, token, {
          difficulty: 'hard',
          optional: {
            seriallyAnswer: 0,
            trueAnswers: 0,
            studied: false,
          },
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const addLearnWord = async () => {
    try {
      const word = await getUserWord(userID, card.id, token)
      if (word.status === 200) {
        const a = await updateUserWord(userID, card.id, token, {
          difficulty: (word as UserWord).difficulty,
          optional: { ...(word as UserWord).optional, studied: true },
        })
        console.log(a)
      } else if (word.status === 404) {
        await createUserWord(userID, card.id, token, {
          difficulty: 'easy',
          optional: {
            seriallyAnswer: 0,
            trueAnswers: 0,
            studied: true,
          },
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <div className="wordCard">
        <div className="cardTop">
          <img src={image} alt="cardImg" />
          <h2 className="cardTitle">{card.word}</h2>
          <div className="cardOverlay" style={color.gradient}></div>
          {isAuth() ? (
            <>
              {isHardGroup ? (
                <button
                  className="hard-icon"
                  onClick={() => {
                    removeHardWord()
                  }}
                >
                  <img src={TrashIcon} alt="alt" />
                </button>
              ) : (
                <>
                  <button
                    className="hard-icon"
                    onClick={() => {
                      addHardWord()
                    }}
                  >
                    <img src={BoltIcon} alt="alt" />
                  </button>
                  <button
                    className="learn-icon"
                    onClick={() => {
                      addLearnWord()
                    }}
                  >
                    <img src={LearnIcon} alt="alt" />
                  </button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="cardMid" style={color.color}>
          <span className="cardMean">{card.wordTranslate}</span>
          <span className="cardMean">{card.transcription}</span>
          <button
            className="cardCircle"
            style={color.color}
            onClick={() => {
              playAudio(audioPath)
            }}
          >
            <img src={AudioImg} alt="" />
          </button>
          <button
            className="audioMean"
            style={color.color}
            onClick={() => {
              playAudio(meanPath)
            }}
            title="Word meaning"
          >
            <img src={InfoImg} alt="" />
          </button>
          <button
            className="audioExamp"
            style={color.color}
            onClick={() => {
              playAudio(examplePath)
            }}
            title="Word example"
          >
            <img src={ExampleImg} alt="" />
          </button>
        </div>
        <div className="cardBottom">
          <article className="cardText">
            <p dangerouslySetInnerHTML={{ __html: card.textMeaning }}></p>
            <p dangerouslySetInnerHTML={{ __html: card.textExample }}></p>
          </article>
          <hr className="separateLine" />
          <article className="cardText">
            <p
              dangerouslySetInnerHTML={{ __html: card.textMeaningTranslate }}
            ></p>
            <p
              dangerouslySetInnerHTML={{ __html: card.textExampleTranslate }}
            ></p>
          </article>
        </div>
      </div>
    </>
  )
}

export async function playAudio(path: string) {
  try {
    const audio = new Audio(`${AUDIO_URL}/${path}`)
    audio.play()
  } catch (e) {
    console.log('Аудио файл не найден')
  }
}
