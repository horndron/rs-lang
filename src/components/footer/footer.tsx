import { AUTHORS } from '../../constants/about'
import { COURSE_LINK, FOOTER_HEIGHT } from '../../constants/footer'
import './footer.scss'
import { Box, Container, Link, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const PATH_GAMES = ['audiocall', 'sprint']
  const navigate = useNavigate()
  const path = window.location.href.split('/')
  const renderFooter = (): boolean => {
    return PATH_GAMES.includes(path[path.length - 1])
  }

  const PATH_EXCEPTION = ['textbook']
  const [footerBottom, setFooterBottom] = useState('')

  const handleFooterBottom = () => {
    setFooterBottom(
      PATH_EXCEPTION.includes(path[path.length - 1]) ? `-${FOOTER_HEIGHT}` : '0'
    )
  }

  useEffect(() => {
    renderFooter()
    handleFooterBottom()
  }, [navigate])
  return (
    <>
      {renderFooter() === true ? (
        <div></div>
      ) : (
        <footer style={{ bottom: footerBottom, height: FOOTER_HEIGHT }}>
          <Container
            maxWidth="xl"
            className="footer-container"
            sx={{ display: 'flex' }}
          >
            <Box
              sx={{
                mx: 2,
                display: 'flex',
                alignItems: 'center',
                ':hover': {
                  color: 'text.secondary',
                },
              }}
            >
              {AUTHORS.map((author, index) => (
                <Link
                  key={author.github + index}
                  href={author.link}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  variant="body2"
                  textAlign="center"
                  sx={{
                    mr: 2,
                    px: 2,
                    py: 1,
                    display: 'flex',
                    color: 'primary.light',
                    alignItems: 'center',
                    ':hover': {
                      color: 'text.primary',
                    },
                  }}
                  className="nav-item"
                >
                  <GitHubIcon sx={{ width: '12px', mr: 1 }} />
                  {author.github}
                </Link>
              ))}
            </Box>
            <Box sx={{ mx: 2, display: { xs: 'none', sm: 'flex' } }}>
              <Typography
                variant="body2"
                noWrap
                component="div"
                sx={{ mr: 2, color: 'primary.main' }}
              >
                2022
              </Typography>
              <Link
                href={COURSE_LINK}
                target="_blank"
                rel="noopener"
                className="rs-button"
              ></Link>
            </Box>
          </Container>
        </footer>
      )}
    </>
  )
}
export default Footer
