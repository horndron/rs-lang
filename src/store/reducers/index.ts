import { combineReducers } from 'redux'
import { wordsReducer } from './wordsReducer'

export const rootReducer = combineReducers({
  words: wordsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
