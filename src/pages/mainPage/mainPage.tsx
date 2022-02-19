import { Box, Container, Link, Typography } from '@mui/material'
import './mainPage.scss'
import { MAIN_CARDS } from '../../constants/mainPage'
import { PROJECT_NAME } from '../../constants/header'

const MainPage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Box id="content">
        <Typography
          variant="h5"
          component="h5"
          sx={{ color: 'secondary.main' }}
        >
          {PROJECT_NAME}
        </Typography>
        {/* <Box>
          {ADVANTAGES.map((advantage, index) => (
            <Box
              className={`advantage advantage${index}`}
              key={advantage.text + index}
            >
              <Typography variant="body1" className="advantage-text">
                {advantage.text}
              </Typography>
            </Box>
          ))}
        </Box> */}
      </Box>
      <Box className="accordion" id="accordion">
        {MAIN_CARDS.map((card, index) => (
          <Box
            className={`main-card main-card${index}`}
            key={card.title + index}
          >
            <Link
              href={`#/${card.route}`}
              className="main-card__link"
              sx={{ textDecoration: 'none' }}
            >
              <Typography variant="h4" component="h4" className="heading">
                {card.title}
              </Typography>
              <Box className="description">
                <Typography variant="h2" component="h2">
                  {card.title}
                </Typography>
                <Typography variant="body1">{card.text}</Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default MainPage
