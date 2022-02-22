import { Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { StatisticForDay } from '../../components/statisticforday/statisticforday'
import { UserStatisticsResponse } from '../../interfaces/api'
import { UserGameStatistic, WordsOnDay } from '../../interfaces/statistics'
import { currentDate } from '../../utils/utils'
import { getUserStatistics } from './../../components/APIs/api'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import './statistic.styles.sass'

export const Statistics: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [statistic, setStatistic] = useState<UserStatisticsResponse>()
  const statisticData = async (): Promise<void> => {
    const userId = localStorage.getItem('userId') as string
    const token = localStorage.getItem('token') as string
    const statisticResponce = await getUserStatistics(userId, token)
    console.log(statisticResponce)
    setStatistic(statisticResponce as UserStatisticsResponse)
    setIsLoading(false)
  }
  const dateKey = currentDate()
  let wordPerDay: number
  let percentForDay: number
  let sprintForDay: UserGameStatistic
  let audiocallForDay: UserGameStatistic

  if (!statistic?.status) {
    wordPerDay =
      (statistic?.optional[dateKey]?.sprint as UserGameStatistic)
        ?.newWordsInGame +
        (statistic?.optional[dateKey]?.audiocall as UserGameStatistic)
          ?.newWordsInGame || 0
    percentForDay =
      Math.round(
        ((statistic?.optional[dateKey]?.sprint as UserGameStatistic)
          ?.rightAnswerPercents +
          (statistic?.optional[dateKey]?.audiocall as UserGameStatistic)
            ?.rightAnswerPercents) /
          2
      ) || 0
    sprintForDay = (statistic?.optional[dateKey]
      ?.sprint as UserGameStatistic) || {
      newWordsInGame: 0,
      rightAnswerPercents: 0,
      longestSeries: 0,
    }
    audiocallForDay = (statistic?.optional[dateKey]
      ?.audiocall as UserGameStatistic) || {
      newWordsInGame: 0,
      rightAnswerPercents: 0,
      longestSeries: 0,
    }
  } else {
    wordPerDay = 0
    percentForDay = 0
    sprintForDay = {
      newWordsInGame: 0,
      rightAnswerPercents: 0,
      longestSeries: 0,
    }
    audiocallForDay = {
      newWordsInGame: 0,
      rightAnswerPercents: 0,
      longestSeries: 0,
    }
  }

  const wordsOnDays: WordsOnDay[] = []
  const wordsAllDays: WordsOnDay[] = []
  let tmpWordsPerDay = 0

  if (statistic?.optional) {
    for (const key in statistic?.optional) {
      const wordItem: WordsOnDay = {
        name: key,
        words: statistic?.optional[key].newWords,
      }
      const wordItemAll: WordsOnDay = {
        name: key,
        words: statistic?.optional[key].newWords + tmpWordsPerDay,
      }
      tmpWordsPerDay = statistic?.optional[key].newWords + tmpWordsPerDay
      wordsOnDays.push(wordItem)
      wordsAllDays.push(wordItemAll)
    }
  }

  useEffect(() => {
    statisticData()
  }, [isLoading])
  if (isLoading) {
    return <h2>Идет загрузка...</h2>
  }
  return (
    <div className="statistics-page">
      <div className="statistics-container">
        <Typography component="div">
          <div>
            <h1>Статистика за сегодня</h1>
            <StatisticForDay
              wordForDay={wordPerDay}
              percentForDay={percentForDay}
              sprint={sprintForDay}
              audiocall={audiocallForDay}
            />

            <div className="statistics">
              <div className="statistics_all_time">
                <h2>Статистика за всё время</h2>
                <div className="chart-container">
                  <span className="description">
                    График, отображающий количество новых слов за каждый день
                    изучения
                  </span>
                  <div className="overflow">
                    <BarChart width={650} height={300} data={wordsOnDays}>
                      <XAxis dataKey="name" stroke="#8884d8" />
                      <YAxis />
                      <Tooltip
                        wrapperStyle={{
                          width: 100,
                          backgroundColor: '#95bdd4',
                        }}
                      />
                      <Legend
                        width={100}
                        wrapperStyle={{
                          top: 40,
                          right: 20,
                          backgroundColor: '#f5f5f5',
                          border: '1px solid #d5d5d5',
                          borderRadius: 3,
                          lineHeight: '40px',
                        }}
                      />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <Bar dataKey="words" fill="#026aa7" barSize={30} />
                    </BarChart>
                  </div>
                  <span className="description">
                    График, отображающий увеличение общего количества изученных
                    слов
                    <br />
                    за весь период обучения по дням
                  </span>
                  <div className="overflow">
                    <LineChart
                      width={650}
                      height={300}
                      data={wordsAllDays}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <Line type="monotone" dataKey="words" stroke="#f8d23c" />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Typography>
      </div>
    </div>
  )
}
