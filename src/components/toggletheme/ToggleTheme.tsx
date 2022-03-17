import { useEffect, useState } from 'react'
import './ToggleTheme.scss'
import { Box } from '@mui/material'
import { COLORS } from '../../constants/about'

const ToggleTheme = () => {
  const themeButton = 'theme-button'
  const storageTheme = 'darkTheme'

  const isDark = () => (localStorage.getItem(storageTheme) ? true : false)
  const [darkTheme, setDarkTheme] = useState(isDark)

  function toggleTheme() {
    const body = document.querySelector('body') as HTMLElement
    const themeInput = document.querySelector(
      `#${themeButton}`
    ) as HTMLInputElement

    if (themeInput.checked) {
      body.classList.add('theme_dark')
      localStorage.setItem(storageTheme, 'dark')
      setDarkTheme(true)
      setDarkColors()
    } else {
      body.classList.remove('theme_dark')
      localStorage.removeItem(storageTheme)
      setDarkTheme(false)
      setStandartColors()
    }
  }

  const setStandartColors = () => {
    COLORS.brandedColor1 = '#8b0061'
    COLORS.brandedColor2 = '#1b73ba'
    COLORS.brandedColor3 = '#f8d23c'
    COLORS.brandedColor4 = '#ff534d'
    COLORS.brandedColor5 = '#de8a00'
    COLORS.brandedColor6 = '#7478ae'
  }

  const setDarkColors = () => {
    COLORS.brandedColor1 = '#4b0034'
    COLORS.brandedColor2 = '#0d395e'
    COLORS.brandedColor3 = '#a38a27'
    COLORS.brandedColor4 = '#812a27'
    COLORS.brandedColor5 = '#9b6001'
    COLORS.brandedColor6 = '#4b4d70'
  }

  const listenToggle = () => {
    const button = document.querySelector(
      `.${themeButton}__wrapper`
    ) as HTMLElement
    button.addEventListener('click', toggleTheme)
  }

  const handleThemeButton = () => {
    const themeInput = document.querySelector(
      `#${themeButton}`
    ) as HTMLInputElement

    if (isDark()) {
      themeInput.checked
      toggleTheme()
    }
  }

  useEffect(() => {
    handleThemeButton()
    listenToggle()
  })
  return (
    <div className={`${themeButton}__wrapper`}>
      <Box className="theme-icon"></Box>
      <input
        className={themeButton}
        type="checkbox"
        id={themeButton}
        name={themeButton}
        checked={darkTheme}
      ></input>
    </div>
  )
}

export default ToggleTheme
