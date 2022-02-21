import { Routes, HashRouter, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './utils/theme'
import './App.styles.scss'

import Header from './components/header/header'
import Footer from './components/footer/footer'

import { TextbookPage } from './components/textbook/textbook'
import { Sprint } from './pages/sprint/sprint'
import { Games } from './pages/games/games'
import MainPage from './pages/mainPage/mainPage'
import About from './pages/about/about'
import { Statistics } from './pages/statistics/statistics'

export const App = () => {
  return (
    <>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <main className="main-container">
            <Routes>
              <Route path={'/'} element={<MainPage />}></Route>
              <Route path={'/textbook'} element={<TextbookPage />}></Route>
              <Route path={'/games'} element={<Games />}></Route>
              <Route path={'/games/sprint'} element={<Sprint />}></Route>
              <Route path={'/stats'} element={<Statistics />}></Route>
              <Route path={'/about'} element={<About />}></Route>
            </Routes>
          </main>
          <Footer />
        </ThemeProvider>
      </HashRouter>
    </>
  )
}
