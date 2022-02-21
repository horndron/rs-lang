import React from 'react'
import { IStatisticForDay } from '../../interfaces/statistics'

export const StatisticForDay: React.FC<IStatisticForDay> = ({
  wordForDay,
  percentForDay,
  sprint,
  audiocall,
}) => {
  return (
    <>
      <div className="statistics_day">
        <div className="day_words">
          {wordForDay}
          <span>слов изучено</span>
        </div>
        <div className="day_right_answers">
          {percentForDay}
          {sprint.newWordsInGame}
          {audiocall.newWordsInGame}
          <span>правильных ответов</span>
        </div>
      </div>
      <div className="statistics_games">
        <div className="game_audiocall">
          <h3>Аудиовызов</h3>
          <div className="words">Изучено слов</div>
          <div className="right-answer">Правильных ответов: .</div>
          <div className="longest-series">Лучшая серия: .</div>
        </div>
        <div className="game_sprint">
          <h3>Спринт</h3>
          <div className="words">Изучено слов</div>
          <div className="right-answer">Правильных ответов: .</div>
          <div className="longest-series">Лучшая серия: .</div>
        </div>
      </div>
    </>
  )
}
