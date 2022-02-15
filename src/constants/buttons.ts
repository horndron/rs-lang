const BUTTON_STYLES = {
  light: {
    color: 'primary.main',
    backgroundColor: 'text.secondary',
    borderColor: 'text.secondary',
    ':hover': {
      color: 'text.secondary',
      borderColor: 'text.secondary',
    },
  },

  lightBorder: {
    color: 'text.secondary',
    borderColor: 'text.secondary',
    ':hover': {
      color: 'primary.main',
      backgroundColor: 'text.secondary',
      borderColor: 'text.secondary',
    },
  },

  color: {
    color: 'text.secondary',
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
      color: 'text.secondary',
      backgroundColor: 'primary.main',
      borderColor: 'primary.main',
    },
  },

  dark: {
    color: 'text.secondary',
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
      color: 'text.secondary',
      backgroundColor: 'secondary.main',
      borderColor: 'secondary.main',
    },
  },

  text: {
    color: 'secondary.main',
    borderColor: 'white',
    ':hover': {
      borderColor: 'secondary.main',
    },
  },
}

export default BUTTON_STYLES
