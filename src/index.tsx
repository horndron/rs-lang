import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

const grade = `
Добрый день!

Не успели доделать некоторые мелочи.
Если не сложно, оставьте, пожалуйста, контакты (или проверьте в четверг).

Спасибо!

`

console.log(grade)
