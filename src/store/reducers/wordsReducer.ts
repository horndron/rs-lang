import { WordsState, WordsAction, WordsActionTypes } from '../../types/words'

const inititalState: WordsState = {
  words: [],
  loading: false,
  error: null,
  page: 0,
  group: 0,
  level: 0,
}

export const wordsReducer = (
  state: WordsState = inititalState,
  action: WordsAction
): WordsState => {
  switch (action.type) {
    case WordsActionTypes.FETCH_WORDS:
      return { ...state, loading: true }
    case WordsActionTypes.FETCH_WORDS_SUCCESS:
      return { ...state, words: action.payload, loading: false }
    case WordsActionTypes.FETCH_WORDS_ERROR:
      return { ...state, loading: false, error: action.payload }
    case WordsActionTypes.SET_WORDS_PAGE:
      return { ...state, page: action.payload }
    case WordsActionTypes.SET_WORDS_GROUP:
      return { ...state, group: action.payload }
    case WordsActionTypes.SET_LEVEL:
      return { ...state, level: action.payload }
    default:
      return state
  }
}
