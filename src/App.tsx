import { NavLink, Routes, HashRouter, Route } from 'react-router-dom'
import './App.styles.scss'
import { TextbookPage } from './components/textbook/textbook'

export const App = () => {
  return (
    <>
      <HashRouter>
        <header className="header-container">
          <nav className="nav-bar container">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/">Главная</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/textbook">Учебник</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/games">Игры</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/stats">Статистика</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about">О нас</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main-container">
          <Routes>
            <Route path={'/'}></Route>
            <Route path={'/textbook'} element={<TextbookPage />}></Route>
            <Route path={'/games'}></Route>
            <Route path={'/stats'}></Route>
            <Route path={'/about'}></Route>
          </Routes>
        </main>
        <footer className="footer-container"></footer>
      </HashRouter>
    </>
  )
}
