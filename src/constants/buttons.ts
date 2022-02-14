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

  trueAnswer: {
    color: 'text.primary',
    borderColor: 'green',
    backgroundColor: 'green',
    ':hover': {
      color: 'text.primary',
      backgroundColor: 'green',
      borderColor: 'green',
    },
  },

  falseAnswer: {
    color: 'text.primary',
    borderColor: '#c00202',
    backgroundColor: '#c00202',
    ':hover': {
      color: 'text.primary',
      backgroundColor: '#c00202',
      borderColor: '#c00202',
    },
  },
}

export default BUTTON_STYLES
