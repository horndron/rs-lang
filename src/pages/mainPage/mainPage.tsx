import * as React from 'react'
import { MAIN_CARDS, ADVANTAGES } from '../../constants/mainPage'
import { PROJECT_NAME } from '../../constants/header'
import './mainPage.scss'
import { AppBar, Box, Container, Link, Typography } from '@mui/material'
import LoginModal from '../../components/login/login'
import MenuSmall from '../../components/header/MenuSmall'

const MainPage = () => {
  const cardClassName = 'main-card'
  const cardActive = `${cardClassName}_active`

  React.useEffect(() => {
    const cards = Array.from(
      document.getElementsByClassName(`${cardClassName}`)
    )

    const addActive = (event: Event) => {
      const currentCard = event.currentTarget as HTMLElement

      cards.forEach((card) => {
        card.classList.remove(cardActive)
      })

      currentCard.classList.add(cardActive)
    }

    cards.forEach((card) => card.addEventListener('click', (e) => addActive(e)))
  })

  const projectNameArr = PROJECT_NAME.split('')

  return (
    <Container
      maxWidth="xl"
      className="main-page"
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Box className="accordion" id="accordion">
        {MAIN_CARDS.map((card, index) => {
          if (index === 0) {
            return (
              <Box
                className={`${cardClassName} ${cardClassName}_${index} ${cardClassName}_${card.name} ${cardActive}`}
                key={card.title + index}
              >
                <AppBar position="static" className="header_card">
                  <Container className="header__inner">
                    <MenuSmall />
                    <LoginModal />
                  </Container>
                </AppBar>
                <Typography
                  variant="h4"
                  component="h4"
                  className="main-card__heading"
                >
                  {card.title}
                </Typography>
                <Box className="advantages__wrapper">
                  <Box className="main-card__img advantages__img"></Box>
                </Box>
                <Box className="main-card__inner">
                  <Typography
                    variant="h1"
                    component="h1"
                    className="main-card__title"
                  >
                    {projectNameArr.map((letter, index) => (
                      <span
                        key={letter + index}
                        className={`letter letter${index}`}
                      >
                        {letter}
                      </span>
                    ))}
                  </Typography>
                  <Typography variant="body2" className="about-project">
                    {card.text}
                  </Typography>

                  <Box className="advantages">
                    <Typography
                      variant="h4"
                      component="h4"
                      className="advantages__title"
                    >
                      Наши преимущества:
                    </Typography>

                    {ADVANTAGES.map((advantage, index) => (
                      <Box
                        className={`advantage ${advantage.name}`}
                        key={advantage.text + index}
                      >
                        <Typography
                          variant="h4"
                          component="h4"
                          className="advantage__title"
                        >
                          {advantage.title}
                        </Typography>
                        <Typography variant="body1" className="advantage__text">
                          {advantage.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )
          }

          return (
            <Box
              className={`${cardClassName} ${cardClassName}_${index} ${cardClassName}_${card.route}`}
              key={card.title + index}
            >
              <Typography
                variant="h4"
                component="h4"
                className="main-card__heading"
              >
                {card.title}
              </Typography>
              <Box className="main-card__img"></Box>
              <Link href={`#/${card.route}`} className="main-card__link">
                <Box className="main-card__description">
                  <Typography variant="h2" component="h2">
                    {card.title}
                  </Typography>
                  <Typography variant="body1">{card.text}</Typography>
                </Box>
              </Link>
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default MainPage
