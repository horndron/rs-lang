import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import './login.scss'
import BUTTON_STYLES from '../../constants/buttons'
import MUIButton from '../UI/MUIButton/MUIButton'
import { TextField } from '@mui/material'

import { isAuth, CreateNewUser, LogIn, LogOut } from '../../auth/auth'

import { ButtonNames, ButtonNameTypes, TextInput } from '../../types/auth'

import {
  validatePassword,
  validateEmail,
  validateName,
} from '../../utils/utils'

const LoginModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    handleSignUpModeClose()
    handleEmailError(false)
    handlePasswordError(false)
    handleNameError(false)
    handleWarning()
  }

  const [signUpMode, setSignUpMode] = React.useState(false)
  const handleSignUpModeClose = () => setSignUpMode(false)
  const handleSignUpMode = () => {
    clearEmptyInputError()
    handleNameError(false)
    setNoWarning()
    setSignUpMode((prevMode) => !prevMode)
  }

  const [buttonName, setButtonName] = React.useState(
    isAuth() ? ButtonNames.LOGOUT : ButtonNames.LOGIN
  )
  const handleButtonName = (name: ButtonNameTypes) => setButtonName(name)

  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  const handleSetLogin = ({ target: { value } }: TextInput) => {
    if (validateEmail(value)) {
      setLogin(value)
      handleEmailError(false)
    } else {
      handleEmailError(true)
    }
  }

  const handleSetPassword = ({ target: { value } }: TextInput) => {
    if (validatePassword(value)) {
      setPassword(value)
      handlePasswordError(false)
    } else {
      handlePasswordError(true)
    }
  }

  const handleSetName = ({ target: { value } }: TextInput) => {
    if (validateName(value)) {
      setName(value)
      handleNameError(false)
    } else {
      handleNameError(true)
    }
  }

  const [emailError, setEmailError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)
  const [nameError, setNameError] = React.useState(false)
  const handleEmailError = (value: boolean) => setEmailError(value)
  const handlePasswordError = (value: boolean) => setPasswordError(value)
  const handleNameError = (value: boolean) => setNameError(value)

  const [warning, setWarning] = React.useState('#ffffff')
  const setNoWarning = () => {
    setWarning('#ffffff')
  }
  const handleWarning = () => {
    return emailError || passwordError || nameError
      ? setWarning('error.main')
      : setWarning('#ffffff')
  }

  const handleButton = () => {
    if (!isAuth()) {
      handleOpen()
    }
    handleLogOut()
  }

  const clearEmptyInputError = () => {
    if (emailError) {
      const mailInput = document.querySelector('#email') as HTMLInputElement
      if (mailInput.value === '') {
        handleEmailError(false)
      }
    }
    if (passwordError) {
      const passwordInput = document.querySelector(
        '#password'
      ) as HTMLInputElement
      if (passwordInput.value === '') {
        handlePasswordError(false)
      }
    }
    if (nameError) {
      const nameInput = document.querySelector('#name') as HTMLInputElement
      if (nameInput.value === '') {
        handleNameError(false)
      }
    }
  }

  const checkAutoEmail = () => {
    const emailInput = document.querySelector('#email') as HTMLInputElement
    const value = emailInput.value as string
    if (value) {
      handleSetLogin({ target: { value } })
    } else {
      handleEmailError(true)
    }
  }

  const checkAutoPassword = () => {
    const passwordInput = document.querySelector(
      '#password'
    ) as HTMLInputElement

    const value = passwordInput.value as string
    if (value) {
      handleSetPassword({ target: { value } })
    } else {
      handlePasswordError(true)
    }
  }

  const checkAutoName = () => {
    const nameInput = document.querySelector('#name') as HTMLInputElement

    const value = nameInput.value as string
    if (value) {
      handleSetName({ target: { value } })
    } else {
      handleNameError(true)
    }
  }

  const handleUser = async () => {
    checkAutoPassword()
    checkAutoEmail()
    checkAutoName()

    if (nameError) {
      handleWarning()
    }

    if (!emailError && !passwordError && login && password) {
      if (signUpMode && !nameError && name) {
        await CreateNewUser(login, password, name)
      } else if (!signUpMode) {
        await LogIn(login, password)
      }

      if (isAuth()) {
        handleClose()
        handleButtonName(ButtonNames.LOGOUT)
      }
    }
  }

  const handleLogOut = () => {
    handleButtonName(ButtonNames.LOGIN)
    LogOut()
  }

  return (
    <div className="login-container">
      <MUIButton
        name={buttonName}
        sx={{ ...BUTTON_STYLES.light }}
        handler={handleButton}
      />
      <Modal
        open={open}
        onClose={handleClose}
        className="login-modal-wrapper"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="login-modal"
          id="login-modal"
          sx={{ boxShadow: 24, p: 4, pl: 6, pr: 6, width: 430 }}
        >
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mb: 1,
              justifyContent: 'center',
              display: signUpMode ? 'flex' : 'none',
              color: 'text.primary',
            }}
          >
            Registration
          </Typography>
          <Typography
            variant="body2"
            noWrap
            component="div"
            color={warning}
            sx={{
              mb: 1,
              justifyContent: 'center',
            }}
          >
            Invalid email, password or name
          </Typography>

          <form>
            <TextField
              error={nameError}
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onFocus={() => handleNameError(false)}
              onBlur={handleSetName}
              style={{ marginBottom: '10px' }}
              sx={{ display: signUpMode ? 'flex' : 'none' }}
              InputLabelProps={{
                style: { color: '#284968' },
              }}
              helperText="5 - 20 letters :)"
              FormHelperTextProps={{
                style: { color: '#aaaaaa' },
              }}
            />
            <TextField
              error={emailError}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onFocus={() => handleEmailError(false)}
              onBlur={handleSetLogin}
              style={{ marginBottom: '8px' }}
              InputLabelProps={{
                style: { color: '#284968' },
              }}
            />
            <TextField
              error={passwordError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onFocus={() => handlePasswordError(false)}
              onBlur={handleSetPassword}
              InputLabelProps={{
                style: { color: '#284968' },
              }}
              helperText="At least 8 symbols. Numbers, letters and special characters."
              FormHelperTextProps={{
                style: { color: '#aaaaaa' },
              }}
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}
            >
              <MUIButton
                name={signUpMode ? ButtonNames.SIGNIN : ButtonNames.LOGIN}
                sx={{ ...BUTTON_STYLES.color }}
                handler={handleUser}
              />
              <MUIButton
                name={signUpMode ? ButtonNames.TO_LOGIN : ButtonNames.TO_SIGNIN}
                sx={{ ...BUTTON_STYLES.text }}
                handler={handleSignUpMode}
              />
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default LoginModal
