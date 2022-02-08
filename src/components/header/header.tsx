import * as React from 'react'
import { NavLink } from 'react-router-dom'
import * as ConstHeader from '../../constants/header'
import './header.scss'

import {
  AppBar,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
  // todo: auth

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const route = (index: number) => {
    return `/${ConstHeader.ROUTES[index]}`
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {ConstHeader.PROJECT_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {ConstHeader.PAGES.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavLink to={route(index)}>
                    <Typography
                      textAlign="center"
                      sx={{ color: 'primary.main' }}
                    >
                      {page}
                    </Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {ConstHeader.PROJECT_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, mx: 2, display: { xs: 'none', md: 'flex' } }}>
            {ConstHeader.PAGES.map((page, index) => (
              <NavLink to={route(index)} key={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    p: 1,
                    m: 1,
                    color: 'text.primary',
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
          {/* // todo: move element to UI */}
          <Button
            variant="outlined"
            sx={{
              my: 2,
              display: 'block',
              color: 'primary.main',
              backgroundColor: 'text.primary',
              textTransform: 'none',
              ':hover': {
                backgroundColor: 'primary.main',
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'text.primary',
              },
            }}
          >
            login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
