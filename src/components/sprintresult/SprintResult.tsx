import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import React, { FC, useEffect } from 'react'
import BUTTON_STYLES from '../../constants/buttons'
import { AUDIO_URL } from '../../constants/cardDataApi'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { SprintResultProps } from '../../interfaces/sprint'
import { setUserGameStatistics } from '../../utils/utils'
import MUIButton from '../UI/MUIButton/MUIButton'

export const SprintResult: FC<SprintResultProps> = ({
  trueAnswer,
  falseAnswer,
  score,
  restartGame,
  isAudioGame = false,
}) => {
  const { bestSeriesAnswer, newWordsInGame, gameName } = useTypeSelector(
    (state) => state.words
  )
  const getAudioWord = (audioName: string): void => {
    const audio = new Audio()
    audio.src = `${AUDIO_URL}/${audioName.split('/')[1]}`
    audio.play()
  }

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('userId')) {
      const userId = localStorage.getItem('userId') as string
      const token = localStorage.getItem('token') as string
      const rightAnswerPercents = Math.round(
        (trueAnswer.length / (trueAnswer.length + falseAnswer.length)) * 100
      )
      setUserGameStatistics(
        userId,
        token,
        {
          newWordsInGame: newWordsInGame,
          rightAnswerPercents: rightAnswerPercents,
          longestSeries: bestSeriesAnswer,
        },
        gameName
      )
    }
  }, [])

  return (
    <div className="result-score">
      <div className="result-container">
        <h2 className="result-score__total">
          {isAudioGame ? (
            <>Игра окончена</>
          ) : (
            <>
              Вы заработали <span>{score}</span> очков
            </>
          )}
        </h2>
        <div className="true-answer">
          <h3>
            Верно: <span className="count">{trueAnswer.length}</span>
          </h3>
          <ul>
            {trueAnswer.map((answer) => (
              <li key={answer.wordId}>
                <VolumeUpRoundedIcon
                  onClick={() => getAudioWord(answer.audio)}
                />
                <span className="word">{answer.word}</span>
                <span className="dash">—</span>
                <span className="answer">{answer.wordTranslate}</span>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="false-answer">
          <h3>
            Ошибка: <span className="count">{falseAnswer.length}</span>
          </h3>
          <ul>
            {falseAnswer.map((answer) => (
              <li key={answer.wordId}>
                <VolumeUpRoundedIcon
                  onClick={() => getAudioWord(answer.audio)}
                />
                <span className="word">{answer.word}</span>
                <span className="dash">—</span>
                <span className="answer">{answer.wordTranslate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="btns">
        <MUIButton
          name="Играть снова"
          handler={restartGame}
          sx={{ ...BUTTON_STYLES.colorBorder }}
        />
        <MUIButton
          name="На главную"
          link="#/"
          sx={{ ...BUTTON_STYLES.colorBorder }}
        />
      </div>
    </div>
  )
}
