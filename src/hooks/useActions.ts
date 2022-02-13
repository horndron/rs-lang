import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionCreaters from '../store/action-creater/'

export const useActions = () => {
  const dispatch = useDispatch()
  console.log(ActionCreaters, 123)
  return bindActionCreators(ActionCreaters, dispatch)
}
