import { useEffect, useState } from 'react'
import { getAllUserWords } from '../../APIs/api'

export const HardWords: React.FC = () => {
  const [words, setWords] = useState([])

  let userID: string
  let token: string
  if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    userID = localStorage.getItem('userId') as string
    token = localStorage.getItem('token') as string
  }
  const getHardWords = async () => {
    const data = await getAllUserWords(userID, token)
    const arr = await data.filter((el) => el.difficulty === 'hard')
    setWords(arr)
  }

  useEffect(() => {
    getHardWords()
  }, [])
  return (
    <>
      <div className="container words-container">
        {words.map((card) => console.log(1, card))}
      </div>
    </>
  )
}
