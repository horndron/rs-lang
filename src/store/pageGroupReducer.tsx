const SET_PAGE = 'SET_PAGE'
const ADD_GROUP = 'ADD_GROUP'

interface IPageGroupAction {
  type: string
  payload: number
}
const defaultState = {
  page: 0,
  group: 0,
}

export const pageGroupReducer = (
  state = defaultState,
  action: IPageGroupAction
) => {
  console.log(state)
  switch (action.type) {
    case SET_PAGE:
      if (action.payload < 0 || action.payload > 29) return state
      return { ...state, page: action.payload }
    case ADD_GROUP:
      return { ...state, group: state.group + 1 }
    default:
      return state
  }
}

export const setPageAction = (payload) => ({
  type: SET_PAGE,
  payload,
})

export const addGroupAction = () => ({
  type: ADD_GROUP,
})
