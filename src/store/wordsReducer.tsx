interface IWordsAction {
  type: string
}

const defaultState = {
  words: [],
}

const GET_WORDS = 'GET_WORDS'
const REMOVE_WORD = 'REMOVE_WORD'

export const wordsReducer = (state = defaultState, action: IWordsAction) => {
  switch (action.type) {
    case GET_WORDS:
      return state
    case REMOVE_WORD:
      return state
    default:
      return state
  }
}

export const removeWordAction = (payload) => ({ type: REMOVE_WORD, payload })
