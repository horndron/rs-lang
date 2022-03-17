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
  return { type: WordsActionTypes.SET_WORDS_GROUP, payload: group }
}

export const setLevel = (level: number) => {
  return { type: WordsActionTypes.SET_LEVEL, payload: level }
}

export const SetBestSeriesAnswer = (bestSeriesAnswer: number) => {
  return {
    type: WordsActionTypes.SET_BESTSERIESANSWER,
    payload: bestSeriesAnswer,
  }
}

export const SetNewWordsInGame = (newWordsInGame: number) => {
  return { type: WordsActionTypes.SET_NEWWORDSINGAME, payload: newWordsInGame }
}

export const SetGameName = (gameName: string) => {
  return { type: WordsActionTypes.SET_GAMENAME, payload: gameName }
}

export const SetFromTextbook = (fromTextbook: boolean) => {
  return { type: WordsActionTypes.SET_FROMTEXTBOOK, payload: fromTextbook }
}
