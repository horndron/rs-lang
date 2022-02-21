import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as ConstHeader from '../../constants/header'
import './header.scss'

import {
  AppBar,
  Button,
  Box,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'

import LoginModal from '../login/login'
import MenuSmall from './MenuSmall'

const Header = () => {
  const route = (index: number) => {
    return `/${ConstHeader.ROUTES[index]}`
  }

  const PATH_MAIN = ''
  const navigate = useNavigate()
  const path = window.location.href.split('/')

  const renderHeader = (): boolean => {
    return PATH_MAIN == path[path.length - 1]
  }

  React.useEffect(() => {
    renderHeader()
  }, [navigate])

  return (
    <>
      {renderHeader() === true ? (
        <div></div>
      ) : (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h1"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {ConstHeader.PROJECT_NAME}
              </Typography>
              <MenuSmall />
              <Typography
                variant="h1"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                {ConstHeader.PROJECT_NAME}
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  mx: 2,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {ConstHeader.PAGES.map((page, index) => (
                  <NavLink to={route(index)} key={page}>
                    <Button
                      sx={{
                        p: 1,
                        m: 1,
                        color: 'text.secondary',
                        display: 'block',
                        textTransform: 'none',
                      }}
                      className="nav-item"
                    >
                      {page}
                    </Button>
                  </NavLink>
                ))}
              </Box>
              <LoginModal />
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  )
}

export default Header
