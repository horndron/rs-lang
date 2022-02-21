import { Typography } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { getUserStatistics } from './../../components/APIs/api'

export const Statistics: FC = () => {
  const statisticData = async (): Promise<void> => {
    const userId = localStorage.getItem('userId') as string
    const token = localStorage.getItem('token') as string
    const statistic = await getUserStatistics(userId, token)

    console.log(statistic)

    const canvas = document.querySelector('#canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const canvasWidth = canvas.clientWidth
    const canvasHeight = canvas.clientHeight
    const scaleX = 50
    const scaleY = 50
    ctx.beginPath()
    ctx.strokeStyle = '#eee'

    for (let i = 0; i < canvasWidth; i = i + scaleX) {
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvasHeight)
    }

    for (let i = 0; i < canvasHeight; i = i + scaleY) {
      ctx.moveTo(0, i)
      ctx.lineTo(canvasWidth, i)
    }
    ctx.stroke()
    ctx.closePath()

    const xAxis = canvasWidth
    const yAxis = canvasHeight

    ctx.beginPath()
    ctx.strokeStyle = '#026aa7'
    ctx.moveTo(0, yAxis)
    ctx.lineTo(xAxis, yAxis)

    ctx.moveTo(0, yAxis)
    ctx.lineTo(0, 0)
    ctx.stroke()
    ctx.closePath()
  }

  useEffect(() => {
    statisticData()
  }, [])

  return (
    <div className="statistics-page">
      <Typography component="div">
        <div>
          <h1>Статистика за сегодня</h1>
          <div className="statistics">
            <div className="statistics_all_time">
              <h2>Статистика за всё время</h2>
              <div className="canvas-container">
                <canvas width="750" height="350" id="canvas" />
              </div>
            </div>
          </div>
        </div>
      </Typography>
    </div>
  )
}
