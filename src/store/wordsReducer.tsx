import { Word } from '../interfaces/api'

interface IWordsAction {
  type: string
  payload: Word[] | void
}

const defaultState = {
  words: [],
}

const SET_WORDS = 'SET_WORDS'
// const REMOVE_WORD = 'REMOVE_WORD'

export const wordsReducer = (state = defaultState, action: IWordsAction) => {
  switch (action.type) {
    case SET_WORDS:
      return { ...state, words: action.payload }
    default:
      return state
  }
}

export const setWordsAction = (payload: Word[]) => ({
  type: SET_WORDS,
  payload,
})
// export const removeWordAction = (payload) => ({ type: REMOVE_WORD, payload })
