import { createStore, combineReducers } from 'redux'
import { wordsReducer } from './wordsReducer'
import { pageGroupReducer } from './pageGroupReducer'

const rootReducer = combineReducers({
  words: wordsReducer,
  page: pageGroupReducer,
})
export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
