import { UserStatistics } from './statistics'

export interface Word {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
  _id?: string
}

export interface User {
  email: string
  password?: string
  name?: string
  id?: string
  status?: number
}

export interface CreateUser {
  id: string
  email: string
  status?: number
}

export interface UpdateToken {
  token: string
  refreshToken: string
  status?: number
}

export interface AuthUser {
  message: string
  token: string
  refreshToken: string
  userId: string
  name: string
  status?: number
}

export interface RejectStatusText {
  status: number
  message: string
}

export interface Options {
  trueAnswers: number
  seriallyAnswer: number
  studied: boolean
}

export interface UserWordParams {
  difficulty: string
  optional: Options
}

export interface UserWord {
  difficulty: string
  optional: Options
  id: string
  wordId: string
  status?: number
}

export interface UserStatisticsResponse extends UserStatistics {
  id: string
  status?: number
}

export interface AggregatedWords {
  paginatedResults: Word[]
  totalCount: [
    {
      count: number
    }
  ]
}

export interface UserAggregatedWords {
  aggregatedWords: AggregatedWords[]
}

export default Word
