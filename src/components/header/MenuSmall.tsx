import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as ConstHeader from '../../constants/header'

import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const MenuSmall = () => {
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

  const PATH_MAIN = ''
  const navigate = useNavigate()
  const path = window.location.href.split('/')

  const smallHeader = (): boolean => {
    return PATH_MAIN == path[path.length - 1]
  }

  React.useEffect(() => {
    smallHeader()
  }, [navigate])

  return (
    <Box
      className="menu_small"
      sx={{
        flexGrow: 1,
        display: { xs: 'flex', md: smallHeader() ? 'flex' : 'none' },
      }}
    >
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
          display: { xs: 'block', md: smallHeader() ? 'flex' : 'none' },
        }}
      >
        {ConstHeader.PAGES.map((page, index) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <NavLink to={route(index)}>
              <Typography textAlign="center" sx={{ color: 'primary.main' }}>
                {page}
              </Typography>
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default MenuSmall
