import { Routes, HashRouter, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './utils/theme'
import './App.styles.scss'

import Header from './components/header/header'
import Footer from './components/footer/footer'

import { TextbookPage } from './components/textbook/textbook'
import MainPage from './pages/mainPage'

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
              <Route path={'/games'}></Route>
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
