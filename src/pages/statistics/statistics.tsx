import { Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { Grafics } from '../../components/grafics/grafics'
import { StatisticForDay } from '../../components/statisticforday/statisticforday'
import { UserStatisticsResponse } from '../../interfaces/api'
import { UserGameStatistic } from '../../interfaces/statistics'
import { currentDate } from '../../utils/utils'
import { getUserStatistics } from './../../components/APIs/api'
import './statistic.styles.sass'

export const Statistics: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [statistic, setStatistic] = useState<UserStatisticsResponse>()
  const statisticData = async (): Promise<void> => {
    const userId = localStorage.getItem('userId') as string
    const token = localStorage.getItem('token') as string
    const statisticResponce = await getUserStatistics(userId, token)
    setStatistic(statisticResponce as UserStatisticsResponse)
    setIsLoading(false)
  }

  const dateKey = currentDate()
  const percentForDay = Math.round(
    ((statistic?.optional[dateKey]?.sprint as UserGameStatistic)
      .rightAnswerPercents +
      (statistic?.optional[dateKey]?.audiocall as UserGameStatistic)
        .rightAnswerPercents) /
      2
  )
  const sprintForDay: UserGameStatistic = (statistic?.optional[dateKey]
    ?.sprint as UserGameStatistic) || {
    newWordsInGame: 0,
    rightAnswerPercents: 0,
    longestSeries: 0,
  }
  const audiocallForDay: UserGameStatistic = (statistic?.optional[dateKey]
    ?.audiocall as UserGameStatistic) || {
    newWordsInGame: 0,
    rightAnswerPercents: 0,
    longestSeries: 0,
  }

  useEffect(() => {
    statisticData()
  }, [isLoading])
  if (isLoading) {
    return <h2>Идет загрузка...</h2>
  }
  return (
    <div className="statistics-page">
      <Typography component="div">
        <div>
          <h1>Статистика за сегодня</h1>
          <StatisticForDay
            wordForDay={statistic?.learnedWords || 0}
            percentForDay={percentForDay}
            sprint={sprintForDay}
            audiocall={audiocallForDay}
          />

          <Grafics />
        </div>
      </Typography>
    </div>
  )
}
