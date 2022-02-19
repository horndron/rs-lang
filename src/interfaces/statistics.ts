interface UserGameStatistic {
  newWordsInGame: number
  rightAnswerPercents: number
  longestSeries: number
}
interface WordInDay {
  newWords: number
  sprint: UserGameStatistic
  audiocall: UserGameStatistic
}
export interface UserStatistics {
  learnedWords: number
  optional: {
    [key: string]: WordInDay
  }
}

export default UserStatistics
