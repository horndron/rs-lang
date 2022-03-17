import React, { useEffect } from 'react'
import { StatisticGraficProps } from '../../interfaces/statistics'

export const Grafics: React.FC<StatisticGraficProps> = ({
  wordsPerDay,
  days,
}) => {
  useEffect(() => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const canvasWidth = canvas.clientWidth
    const canvasHeight = canvas.clientHeight
    const xAxis = canvasWidth
    const yAxis = canvasHeight
    ctx.beginPath()
    ctx.strokeStyle = '#eee'

    for (let i = 0; i <= canvasWidth; i++) {
      ctx.fillText(days[i], (i * xAxis) / days.length, yAxis)
      ctx.fillRect(
        (i * xAxis) / days.length + 20,
        yAxis - (yAxis * wordsPerDay[i]) / 180,
        5,
        5
      )
    }

    for (let i = 9; i > 0; i--) {
      ctx.fillText(`${i * 20}`, 0, ((10 - i) * yAxis) / 10)
    }
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = '#026aa7'
    ctx.moveTo(20, yAxis - 20)
    ctx.lineTo(xAxis - 20, yAxis - 20)

    ctx.moveTo(20, yAxis - 20)
    ctx.lineTo(20, 20)
    ctx.stroke()
    ctx.closePath()
  }, [])
  return (
    <div className="statistics">
      <div className="statistics_all_time">
        <h2>Статистика за всё время</h2>
        <div className="canvas-container">
          <canvas width="750" height="350" id="canvas" />
        </div>
      </div>
    </div>
  )
}
