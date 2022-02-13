import * as ConstFooter from '../../constants/footer'
import './footer.scss'
import { Box, Container, Link, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const PATH_GAMES = ['audiocall', 'sprint']
  const navigate = useNavigate()
  const path = window.location.href.split('/')
  const renderFooter = (): boolean => {
    return PATH_GAMES.includes(path[path.length - 1])
  }
  useEffect(() => {
    renderFooter()
  }, [navigate])
  return (
    <>
      {renderFooter() === true ? (
        <div></div>
      ) : (
        <footer>
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
              }}
            >
              {ConstFooter.AUTHORS.map((author) => (
                <Link
                  key={author.name}
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
                  {author.name}
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
                href={ConstFooter.COURSE_LINK}
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
