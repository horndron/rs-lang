import React, { useEffect } from 'react'
import { AUDIO_URL, GROUP_COLOR, IMAGE_URL } from '../../constants/cardDataApi'
import { useActions } from '../../hooks/useActions'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { WordSettings } from './settings'
import Word from '../../interfaces/api'
import AudioImg from '../../assets/svg/auido.svg'
import InfoImg from '../../assets/svg/info-solid.svg'
import ExampleImg from '../../assets/svg/book-open-solid.svg'
import './textbook.style.scss'

interface ICard {
  card: Word
  group: number
}

export const TextbookPage: React.FC = () => {
  const { words, loading, error, page, group } = useTypeSelector(
    (state) => state.words
  )
  const { fetchWords } = useActions()
  useEffect(() => {
    fetchWords(group, page)
  }, [page])

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
          <WordCard key={card.id} card={card} group={group} />
        ))}
        <WordSettings />
      </div>
    </>
  )
}

export const WordCard: React.FC<ICard> = ({ card, group }) => {
  const image = `${IMAGE_URL}/${card.image.split('/')[1]}`
  const audioPath = `${card.audio.split('/')[1]}`
  const meanPath = `${card.audioMeaning.split('/')[1]}`
  const examplePath = `${card.audioExample.split('/')[1]}`

  const color = GROUP_COLOR[group]
  return (
    <>
      <div className="wordCard">
        <div className="cardTop">
          <img src={image} alt="cardImg" />
          <h2 className="cardTitle">{card.word}</h2>
          <div className="cardOverlay" style={color.gradient}></div>
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
