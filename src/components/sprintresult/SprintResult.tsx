import React from 'react'
import { SprintResultProps } from '../../interfaces/sprint'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import { AUDIO_URL } from '../../constants/cardDataApi'

export const SprintResult: React.FC<SprintResultProps> = ({
  trueAnswer,
  falseAnswer,
}) => {
  const getAudioWord = (audioName: string): void => {
    const audio = new Audio()
    audio.src = `${AUDIO_URL}/${audioName.split('/')[1]}`
    audio.play()
  }
  return (
    <div className="result-score">
      <div className="result-container">
        <div className="true-answer">
          <h3>Верно: {trueAnswer.length}</h3>
          <ul>
            {trueAnswer.map((answer) => (
              <li key={answer.wordId}>
                <VolumeUpRoundedIcon
                  onClick={() => getAudioWord(answer.audio)}
                />
                <span className="word">{answer.word}</span>
                <span> — </span>
                <span className="answer">{answer.wordTranslate}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="false-answer">
          <h3>Ошибка: {falseAnswer.length}</h3>
          <ul>
            {falseAnswer.map((answer) => (
              <li key={answer.wordId}>
                <VolumeUpRoundedIcon onClick={() => console.log(answer)} />
                <span className="word">{answer.word}</span>
                <span> — </span>
                <span className="answer">{answer.wordTranslate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
