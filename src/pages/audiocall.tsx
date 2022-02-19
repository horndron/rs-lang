import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { PreperaGame } from '../components/preperagame/PreperaGame'
import { SprintResult } from '../components/sprintresult/SprintResult'
import { Word } from '../interfaces/api'
import FillHeart from '../assets/svg/heart-solid.svg'
import BreakHeart from '../assets/svg/heart-crack-solid.svg'
import AudioGame from '../assets/svg/audio-game.svg'
import './audiocall.style.scss'
import { CircleTimer } from '../components/circletimer/CircleTimer'
import MUIButton from '../components/UI/MUIButton/MUIButton'
import BUTTON_STYLES from '../constants/buttons'

export const Audiocall: React.FC = () => {
  const test = new Array(4).fill(0)

  const [preperaGame, setPreperaGame] = useState<boolean>(true)
  const [words, setWords] = useState<Word[]>([]) // useState([] as Word[])
  const [length, setLength] = useState<number>(0)
  const [lives, setLives] = useState<number>(5)
  console.log(setLength, setLives, setWords)
  const startGame = () => {
    setPreperaGame(false)
  }
  return (
    <>
      <div className="audiocall-game">
        <Typography component="div">
          <div className="audiocall-container">
            {preperaGame ? (
              <PreperaGame handler={startGame} />
            ) : length <= words.length ? (
              <div className="word-card">
                <div className="word-card__top">
                  <Lives lives={lives} />
                  <AudioExample />
                  <CircleTimer
                    duration={10}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[10, 7, 3, 0]}
                    onComplete={() => {
                      console.log('timeover')
                    }}
                    size={50}
                    strokeWidth={6}
                  />
                </div>
                <div className="word-card__bottom">
                  <div className="answers">
                    {test.map((el, ind) => (
                      <MUIButton
                        key={`ans-${ind}-btn`}
                        name={`${el}`}
                        handler={() => {
                          console.log('заглушки')
                        }}
                        sx={{ ...BUTTON_STYLES.colorBorder }}
                      />
                    ))}
                  </div>
                  <MUIButton
                    name="Don't know"
                    handler={() => {
                      console.log('заглушки')
                    }}
                    sx={{ ...BUTTON_STYLES.darkBorder }}
                  />
                </div>
              </div>
            ) : (
              <SprintResult
              // trueAnswer={result.true}
              // falseAnswer={result.false}
              // score={score.total}
              // restartGame={getGamesAgain}
              />
            )}
          </div>
        </Typography>
      </div>
    </>
  )
}

const Lives = ({ lives }) => {
  const count = new Array(5).fill(0)
  console.log(count, 'asdasd')
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

const AudioExample: React.FC = ({ word }) => {
  console.log(word)
  return (
    <>
      <button className="audio-example">
        <img alt="audio-example" src={AudioGame}></img>
      </button>
    </>
  )
}
