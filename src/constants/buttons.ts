const BUTTON_STYLES = {
  light: {
    color: 'primary.main',
    backgroundColor: 'text.primary',
    borderColor: 'text.primary',
    ':hover': {
      color: 'text.primary',
      borderColor: 'text.primary',
    },
  },

  lightBorder: {
    color: 'text.primary',
    borderColor: 'text.primary',
    ':hover': {
      color: 'primary.main',
      backgroundColor: 'text.primary',
      borderColor: 'text.primary',
    },
  },

  color: {
    color: 'text.primary',
    backgroundColor: 'primary.main',
    borderColor: 'primary.main',
    ':hover': {
      color: 'primary.main',
      borderColor: 'primary.main',
    },
  },

  colorBorder: {
    color: 'primary.main',
    borderColor: 'primary.main',
    ':hover': {
      color: 'text.primary',
      backgroundColor: 'primary.main',
      borderColor: 'primary.main',
    },
  },

  dark: {
    color: 'text.primary',
    backgroundColor: 'secondary.main',
    borderColor: 'secondary.main',
    ':hover': {
      color: 'secondary.main',
      borderColor: 'secondary.main',
    },
  },

  darkBorder: {
    color: 'secondary.main',
    borderColor: 'secondary.main',
    ':hover': {
      color: 'text.primary',
      backgroundColor: 'secondary.main',
      borderColor: 'secondary.main',
    },
  },
}

export default BUTTON_STYLES
