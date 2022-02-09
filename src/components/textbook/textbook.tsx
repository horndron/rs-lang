import React, { useEffect } from 'react'
import { IMAGE_URL } from '../../constants/cardDataApi'
import { useActions } from '../../hooks/useActions'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import './textbook.style.scss'

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
        {words.map((card) => (
          <WordCard key={card.id} data={card} />
        ))}
        <WordSettings />
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

export const WordSettings: React.FC = () => {
  const { page } = useTypeSelector((state) => state.words)
  const { setWordsPage } = useActions()
  function changePage(type: string) {
    switch (type) {
      case 'prev':
        if (page > 0) setWordsPage(page - 1)
        break
      case 'next':
        if (page < 29) setWordsPage(page + 1)
        break
    }
  }
  return (
    <>
      <div className="settingsBar">
        <button
          onClick={() => {
            changePage('prev')
          }}
        >
          prev
        </button>
        <div className="pageSwitcher">{`${page + 1} / 30`}</div>
        <button
          onClick={() => {
            changePage('next')
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
