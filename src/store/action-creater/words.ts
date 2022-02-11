import { Dispatch } from 'react'
import { WordsAction, WordsActionTypes } from '../../types/words'
import { getChunkWords } from '../../components/APIs/api'

export const fetchWords = (group = 0, page = 0) => {
  return async (dispatch: Dispatch<WordsAction>) => {
    try {
      dispatch({ type: WordsActionTypes.FETCH_WORDS })
      const response = await getChunkWords(group, page)
      dispatch({
        type: WordsActionTypes.FETCH_WORDS_SUCCESS,
        payload: response ? response : [],
      })
    } catch (e) {
      dispatch({
        type: WordsActionTypes.FETCH_WORDS_ERROR,
        payload: 'Произошла ошибка при загрузке слов',
      })
    }
  }
}

export const setWordsPage = (page: number) => {
  return { type: WordsActionTypes.SET_WORDS_PAGE, payload: page }
}

export const setWordsGroup = (group: number) => {
  return { type: WordsActionTypes.SET_WORDS_PAGE, payload: group }
}
