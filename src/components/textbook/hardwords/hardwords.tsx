import { useEffect, useState } from 'react'
import { getUserHardWords } from '../../APIs/api'
import { WordCard } from '../textbook'
import { HardWordSettings } from './settingsHard'

export const HardWords: React.FC = () => {
  const [words, setWords] = useState([])

  let userID: string
  let token: string
  if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    userID = localStorage.getItem('userId') as string
    token = localStorage.getItem('token') as string
  }
  const getHardWords = async () => {
    console.log(1)
    const data = await getUserHardWords(
      userID,
      token,
      100,
      '{"$and":[{"userWord.difficulty":"hard"}]}'
    )
    console.log(data, 'data-hard')
    setWords(data[0].paginatedResults)
  }

  useEffect(() => {
    getHardWords()
  }, [])
  return (
    <>
      <div className="container words-container">
        {words.map((card, ind) => (
          <WordCard
            key={`hardword-${ind}-card`}
            card={card}
            group={6}
            isHardGroup={true}
            getHardWords={getHardWords}
          />
        ))}
        {words.length > 0 ? (
          <HardWordSettings position={'sticky'} pos={0} />
        ) : (
          <HardWordSettings position={'absolute'} pos={40} />
        )}
      </div>
    </>
  )
}
