import { Routes, HashRouter, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './utils/theme'
import './App.styles.scss'
import './games.styles.sass'

import Header from './components/header/header'
import Footer from './components/footer/footer'

import { TextbookPage } from './components/textbook/textbook'
import { Sprint } from './pages/sprint'
import { Games } from './pages/games'

export const App = () => {
  return (
    <>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <main className="main-container">
            <Routes>
              <Route path={'/'}></Route>
              <Route path={'/textbook'} element={<TextbookPage />}></Route>
              <Route path={'/games'} element={<Games />}></Route>
              <Route path={'/games/sprint'} element={<Sprint />}></Route>
              <Route path={'/stats'}></Route>
              <Route path={'/about'}></Route>
            </Routes>
          </main>
          {/* // todo: remove footer for games pages */}
          <Footer />
        </ThemeProvider>
      </HashRouter>
    </>
  )
}
