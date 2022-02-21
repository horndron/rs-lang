import * as React from 'react'
import { gsap } from 'gsap'
import './about.scss'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Container, Link, Typography } from '@mui/material'
import { AUTHORS, COLORS, ABOUT_TEXT } from '../../constants/about'

const About = () => {
  let screenWidth = window.innerWidth

  const [cardHeight, setCardHeight] = React.useState('')
  const handleCardHeight = () => {
    setCardHeight(screenWidth > 1600 ? '500px' : '400px')
  }
  React.useEffect(() => {
    handleCardHeight()
  })

  const updateDimensions = () => {
    screenWidth = window.innerWidth
    handleCardHeight()
  }
  window.addEventListener('resize', updateDimensions)

  const author1 = `${AUTHORS[0].github}`
  const author2 = `${AUTHORS[1].github}`
  const author3 = `${AUTHORS[2].github}`

  const color1 = `${COLORS.brandedColor6}`
  const color2 = `${COLORS.brandedColor3}`
  const color3 = `${COLORS.brandedColor1}`

  const tl = gsap.timeline({ default: { duration: 1 } })
  const tl2 = gsap.timeline({ default: { duration: 1 } })
  const tl3 = gsap.timeline({ default: { duration: 1 } })

  function showWrapper(element: string, color: string) {
    return gsap.fromTo(
      `${element}`,
      { height: 0, backgroundColor: 'transparent' },
      {
        delay: 0,
        duration: 1,
        height: `${cardHeight}`,
        backgroundColor: `${color}`,
      }
    )
  }

  function showPhoto(element: string) {
    return gsap.fromTo(
      `${element}`,
      { opacity: 0 },
      {
        opacity: 1,
        delay: 0,
        duration: 1,
      }
    )
  }

  tl.to(`.${author1}`, { borderTopColor: color1, delay: 0.3 })
    .to(`.${author1}`, { borderRightColor: color1 }, '-=0.2')
    .to(`.${author1}`, { borderBottomColor: color1 }, '-=0.2')
    .to(`.${author1}`, { borderLeftColor: color1 }, '-=0.2')
    .add(showWrapper(`.${author1} .author-wrapper`, color1))

  tl2
    .to(`.${author2}`, { borderTopColor: color2, delay: 0.3 })
    .to(`.${author2}`, { borderRightColor: color2 }, '-=0.2')
    .to(`.${author2}`, { borderBottomColor: color2 }, '-=0.2')
    .to(`.${author2}`, { borderLeftColor: color2 }, '-=0.2')
    .add(showWrapper(`.${author2} .author-wrapper`, color2))

  tl3
    .to(`.${author3}`, { borderTopColor: color3, delay: 0.3 })
    .to(`.${author3}`, { borderRightColor: color3 }, '-=0.2')
    .to(`.${author3}`, { borderBottomColor: color3 }, '-=0.2')
    .to(`.${author3}`, { borderLeftColor: color3 }, '-=0.2')
    .add(showWrapper(`.${author3} .author-wrapper`, color3))

  tl.add(showPhoto(`.${author1} .author-img`))
    .add(showPhoto(`.${author2} .author-img`))
    .add(showPhoto(`.${author3} .author-img`))

  return (
    <Container maxWidth="xl" className="about">
      <Box className="about__wrapper">
        <Typography variant="h2" component="h2" className="about__title">
          Наша команда
        </Typography>
        <Typography variant="body1" className="about__text">
          {ABOUT_TEXT}
        </Typography>
      </Box>
      <Container className="about__authors">
        {AUTHORS.map((author) => (
          <Box key={author.github} className={`author-card ${author.github}`}>
            <Box className="author-wrapper">
              <Box className="author-overlay">
                <Box className="author-img"></Box>
              </Box>

              <Box className="author-description">
                <Typography variant="h4" component="h4" className="author-name">
                  {author.name}
                </Typography>
                <Link
                  href={author.link}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  variant="body2"
                  className="author-link"
                  sx={{
                    ':hover': {
                      color: 'secondary.main',
                    },
                  }}
                >
                  <GitHubIcon sx={{ width: '12px', mr: '5px' }} />
                  {author.github}
                </Link>
                <Box className="author-tasks">
                  {author.tasks.map((item, index) => (
                    <Typography
                      variant="body2"
                      key={item.task + index}
                      className="task"
                      sx={{
                        backgroundColor: `${item.color}`,
                      }}
                    >
                      {item.task}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Container>
    </Container>
  )
}

export default About
