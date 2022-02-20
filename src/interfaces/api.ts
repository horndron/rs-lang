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

interface WordInDay {
  date: string
  newWords: number
}
export interface UserStatistics {
  learnedWords: number
  optional: {
    wordInDay: WordInDay[]
  }
}

export default Word
