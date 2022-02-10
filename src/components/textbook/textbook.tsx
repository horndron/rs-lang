import React, { useEffect } from 'react'
import { GROUP_COLOR, IMAGE_URL } from '../../constants/cardDataApi'
import { useActions } from '../../hooks/useActions'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import Word from '../../interfaces/api'
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
          <div className="cardCircle" style={color.color}></div>
        </div>
        <div className="cardBottom"></div>
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
