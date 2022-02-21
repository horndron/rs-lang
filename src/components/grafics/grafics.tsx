import React, { useEffect } from 'react'

export const Grafics: React.FC = () => {
  useEffect(() => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement
    console.log(canvas)
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const canvasWidth = canvas.clientWidth
    const canvasHeight = canvas.clientHeight
    const scaleX = 50
    const scaleY = 50
    const xAxis = canvasWidth
    const yAxis = canvasHeight
    ctx.beginPath()
    ctx.strokeStyle = '#eee'

    for (let i = 0; i < canvasWidth; i = i + scaleX) {
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvasHeight)
      ctx.fillText(`${(i - xAxis) / scaleX}`, i, yAxis)
    }

    for (let i = 0; i < canvasHeight; i = i + scaleY) {
      ctx.moveTo(0, i)
      ctx.lineTo(canvasWidth, i)
    }
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = '#026aa7'
    ctx.moveTo(0, yAxis)
    ctx.lineTo(xAxis, yAxis)

    ctx.moveTo(0, yAxis)
    ctx.lineTo(0, 0)
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
