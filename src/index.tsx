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

Так вышло что в суматохе засабмитили в RS App ссылку на деплой вместо ПР.
Ниже будет ссылка на сам ПР, надеюсь на Ваше понимание, финальный таск, силы на исходе) 
https://github.com/horndron/rs-lang/pull/14

Не успели доделать некоторые мелочи.
Если не сложно, оставьте, пожалуйста, контакты (или проверьте в четверг).

Спасибо!

`

console.log(grade)
