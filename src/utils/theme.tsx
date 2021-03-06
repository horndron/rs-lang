import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4E97C2',
      light: '#95bdd4',
    },
    secondary: {
      main: '#026AA7',
    },
    background: {
      default: '#284968',
    },
    text: {
      primary: '#284968',
      secondary: '#ecf7ff',
    },
  },
  typography: {
    fontFamily: 'Titillium Web, Arial',
    h1: {
      fontFamily: 'Ribeye Marrow, cursive',
      fontSize: '1.2rem',
    },
    h5: {
      fontSize: '1.3rem',
    },
    button: {
      fontSize: '0.9rem',
    },
  },
})
