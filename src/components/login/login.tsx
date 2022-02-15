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

import { validatePassword, validateEmail } from '../../utils/utils'

const LoginModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    handleSignUpModeClose()
    handleEmailError(false)
    handlePasswordError(false)
  }

  const [signUpMode, setSignUpMode] = React.useState(false)
  const handleSignUpModeClose = () => setSignUpMode(false)
  const handleSignUpMode = () => {
    setSignUpMode((prevMode) => !prevMode)
  }

  const [buttonName, setButtonName] = React.useState(
    isAuth() ? ButtonNames.LOGOUT : ButtonNames.LOGIN
  )
  const handleButtonName = (name: ButtonNameTypes) => setButtonName(name)

  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')

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

  const [emailError, setEmailError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)
  const handleEmailError = (value: boolean) => setEmailError(value)
  const handlePasswordError = (value: boolean) => setPasswordError(value)

  const handleButton = () => {
    if (!isAuth()) {
      handleOpen()
    }
    handleLogOut()
  }

  const handleUser = async () => {
    if (!emailError && !passwordError) {
      signUpMode
        ? await CreateNewUser(login, password)
        : await LogIn(login, password)

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

  const handleWarning = () => {
    return emailError || passwordError ? 'error.main' : '#ffffff'
  }

  return (
    <div>
      <MUIButton
        name={buttonName}
        sx={{ ...BUTTON_STYLES.light }}
        handler={handleButton}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="login-modal" sx={{ boxShadow: 24, p: 4 }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mb: 3,
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
            color={handleWarning}
            sx={{
              mb: 1,
              justifyContent: 'center',
            }}
          >
            Invalid email or password
          </Typography>

          <form>
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
              onBlur={handleSetLogin}
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