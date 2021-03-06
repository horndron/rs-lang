export interface UserGameStatistic {
  newWordsInGame: number
  rightAnswerPercents: number
  longestSeries: number
}
export interface WordInDay {
  newWords: number
  [key: string]: UserGameStatistic | number
}
export interface UserStatistics {
  learnedWords: number
  optional: {
    [key: string]: WordInDay
  }
}

export interface IStatisticForDay {
  wordForDay: number
  percentForDay: number
  sprint: UserGameStatistic
  audiocall: UserGameStatistic
}

export interface StatisticGraficProps {
  wordsPerDay: number[]
  days: string[]
}

export interface WordsOnDay {
  name: string
  words: number
}

export default UserStatistics
