import { Word } from '../interfaces/api'

export interface WordsState {
  words: Word[]
  loading: boolean
  error: null | string
  page: number
  group: number
  level: number
  fromTextbook: boolean
  newWordsInGame: number
  bestSeriesAnswer: number
  gameName: string
}

export enum WordsActionTypes {
  FETCH_WORDS = 'FETCH_WORDS',
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR',
  SET_WORDS_PAGE = 'SET_WORDS_PAGE',
  SET_WORDS_GROUP = 'SET_WORDS_GROUP',
  SET_LEVEL = 'SET_LEVEL',
  SET_FROMTEXTBOOK = 'SET_FROMTEXTBOOK',
  SET_NEWWORDSINGAME = 'SET_NEWWORDSINGAME',
  SET_BESTSERIESANSWER = 'SET_BESTSERIESANSWER',
  SET_GAMENAME = 'SET_GAMENAME',
}

interface FetchWordsAction {
  type: WordsActionTypes.FETCH_WORDS
}

interface FetchWordsSuccessAction {
  type: WordsActionTypes.FETCH_WORDS_SUCCESS
  payload: Word[]
}

interface FetchWordsErrorAction {
  type: WordsActionTypes.FETCH_WORDS_ERROR
  payload: string
}

interface SetWordsPageAction {
  type: WordsActionTypes.SET_WORDS_PAGE
  payload: number
}
interface SetWordsGroupAction {
  type: WordsActionTypes.SET_WORDS_GROUP
  payload: number
}

interface SetLevelAction {
  type: WordsActionTypes.SET_LEVEL
  payload: number
}

interface SetNewWordsInGame {
  type: WordsActionTypes.SET_NEWWORDSINGAME
  payload: number
}

export interface SetBestSeriesAnswer {
  type: WordsActionTypes.SET_BESTSERIESANSWER
  payload: number
}

export interface SetGamename {
  type: WordsActionTypes.SET_GAMENAME
  payload: string
}

export interface SetFromTextbook {
  type: WordsActionTypes.SET_FROMTEXTBOOK
  payload: boolean
}

export type WordsAction =
  | FetchWordsAction
  | FetchWordsSuccessAction
  | FetchWordsErrorAction
  | SetWordsPageAction
  | SetWordsGroupAction
  | SetLevelAction
  | SetNewWordsInGame
  | SetBestSeriesAnswer
  | SetGamename
  | SetFromTextbook
