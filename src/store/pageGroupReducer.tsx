const SET_PAGE = 'SET_PAGE'
const SET_GROUP = 'SET_GROUP'

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
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.payload }
    case SET_GROUP:
      return { ...state, group: action.payload }
    default:
      return state
  }
}

export const setPageAction = (payload: number) => ({
  type: SET_PAGE,
  payload,
})

export const setGroupAction = (payload: number) => ({
  type: SET_GROUP,
  payload,
})
