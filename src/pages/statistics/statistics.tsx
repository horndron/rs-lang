import { Typography } from '@mui/material'
import React from 'react'

export const Statistics = () => {
  return (
    <div className="statistics-page">
      <Typography component="div">
        <div>
          <h1>Статистика за сегодня</h1>
          <div className="statistics">
            <div className="statistics_day">
              <div className="day_words"></div>
              <div className="day_right_answers"></div>
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
            <div className="statistics_all_time">
              <h2>Статистика за всё время</h2>
            </div>
          </div>
        </div>
      </Typography>
    </div>
  )
}
