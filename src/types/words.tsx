import { Word } from '../interfaces/api'

export interface WordsState {
  words: Word[]
  loading: boolean
  error: null | string
  page: number
  group: number
  level: number
}

export enum WordsActionTypes {
  FETCH_WORDS = 'FETCH_WORDS',
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR',
  SET_WORDS_PAGE = 'SET_WORDS_PAGE',
  SET_WORDS_GROUP = 'SET_WORDS_GROUP',
  SET_LEVEL = 'SET_LEVEL',
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
export type WordsAction =
  | FetchWordsAction
  | FetchWordsSuccessAction
  | FetchWordsErrorAction
  | SetWordsPageAction
  | SetWordsGroupAction
  | SetLevelAction
