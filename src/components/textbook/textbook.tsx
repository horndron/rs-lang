// import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_URL } from '../../constants/cardDataApi'
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
      </div>
    </>
  )
}

export const WordCard: React.FC = ({ data }) => {
  const image = `${IMAGE_URL}/${data.image.split('/')[1]}`
  return (
    <>
      <div className="wordCard">
        <div
          className="cardTop"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    </>
  )
}
