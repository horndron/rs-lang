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
        <div className="statistics_day_item day_words">
          {wordForDay}
          <span>слов изучено</span>
        </div>
        <div className="statistics_day_item day_right_answers">
          {percentForDay}%<span>правильных ответов</span>
        </div>
      </div>
      <div className="statistics_games">
        <div className="game game_audiocall">
          <h3>Спринт</h3>
          <div className="words">
            Изучено слов <span>{sprint.newWordsInGame}</span>
          </div>
          <div className="right-answer">
            Правильных ответов: <span>{sprint.rightAnswerPercents}%</span>.
          </div>
          <div className="longest-series">
            Лучшая серия: <span>{sprint.longestSeries}</span>.
          </div>
        </div>
        <div className="game game_sprint">
          <h3>Аудиовызов</h3>
          <div className="words">
            Изучено слов <span>{audiocall.newWordsInGame}</span>
          </div>
          <div className="right-answer">
            Правильных ответов: <span>{audiocall.rightAnswerPercents}%</span>.
          </div>
          <div className="longest-series">
            Лучшая серия: <span>{audiocall.longestSeries}</span>.
          </div>
        </div>
      </div>
    </>
  )
}
