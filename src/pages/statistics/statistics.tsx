import { Typography } from '@mui/material'
import React from 'react'

export const Statistics = () => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  console.log(canvas)
  // const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  // ctx.fillStyle = 'black'
  // ctx.lineWidth = 2.0
  // ctx.beginPath()
  // ctx.moveTo(30, 10)
  // ctx.lineTo(30, 460)
  // ctx.lineTo(500, 460)
  // ctx.stroke()

  // ctx.fillStyle = 'black'
  // for (let i = 0; i < 6; i++) {
  //   ctx.fillText((5 - i) * 20 + '', 4, i * 80 + 60)
  //   ctx.beginPath()
  //   ctx.moveTo(25, i * 80 + 60)
  //   ctx.lineTo(30, i * 80 + 60)
  //   ctx.stroke()
  // }
  // const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY']

  // for (let i = 0; i < 5; i++) {
  //   ctx.fillText(labels[i], 50 + i * 100, 475)
  // }

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
              <div className="canvas-container">
                <canvas width="750" height="400" id="canvas" />
              </div>
            </div>
          </div>
        </div>
      </Typography>
    </div>
  )
}
