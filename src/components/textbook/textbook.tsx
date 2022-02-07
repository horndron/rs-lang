// import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_URL } from '../../constants/cardDataApi'
import { setPageAction } from '../../store/pageGroupReducer'
import { setWordsAction } from '../../store/wordsReducer'
import { getChunkWords } from '../APIs/api'
import './textbook.style.scss'

export const TextbookPage: React.FC = () => {
  const words = useSelector((state) => state.words.words)
  const page = useSelector((state) => state.page.page)
  const group = useSelector((state) => state.page.group)

  const dispatch = useDispatch()
  async function getWords() {
    const newWords = await getChunkWords(group, page)
    dispatch(setWordsAction(newWords))
  }
  useEffect(() => {
    getWords()
  }, [])

  return (
    <>
      <div className="container words-container">
        {words.map((card) => (
          <WordCard key={card.id} data={card} />
        ))}
        <WordSettings getWords={getWords} />
      </div>
    </>
  )
}

export const WordCard: React.FC = ({ data }) => {
  const image = `${IMAGE_URL}/${data.image.split('/')[1]}`
  const color = randomColor()
  return (
    <>
      <div className="wordCard">
        <div className="cardTop" style={{ backgroundImage: `url(${image})` }}>
          <div
            className="content"
            style={{
              background: `linear-gradient(rgba(255, 255, 255, 0), ${color})`,
            }}
          ></div>
          <h3 className="cardTitle">{data.word}</h3>
          <p className="wordSpell">{`${data.wordTranslate} ${data.transcription}`}</p>
        </div>
        <div className="cardBottom" style={{ background: color }}>
          <p className="cardText">
            <span dangerouslySetInnerHTML={{ __html: data.textMeaning }}></span>
            <br />
            <span dangerouslySetInnerHTML={{ __html: data.textExample }}></span>
          </p>
          <hr className="separateLine" />
          <p className="cardText">
            <span
              dangerouslySetInnerHTML={{ __html: data.textMeaningTranslate }}
            ></span>
            <br />
            <span
              dangerouslySetInnerHTML={{ __html: data.textExampleTranslate }}
            ></span>
          </p>
        </div>
      </div>
    </>
  )
}

export const WordSettings: React.FC = ({ getWords }) => {
  const page = useSelector((state) => state.page.page)
  const dispatch = useDispatch()
  // const group = useSelector((state) => state.page.group)
  return (
    <>
      <div className="settingsBar">
        <button>prev</button>
        <div className="pageSwitcher">{`${page + 1} / 30`}</div>
        <button
          onClick={() => {
            dispatch(setPageAction(page + 1))
            getWords()
          }}
        >
          next
        </button>
      </div>
    </>
  )
}
function randomColor() {
  return `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`
}
