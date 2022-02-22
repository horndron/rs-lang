import { TOKEN, USER_ID, USER_NAME } from '../constants/auth'
import { createUser, signInUser } from '../components/APIs/api'

export const isAuth = () => {
  const id = localStorage.getItem(USER_ID)
  const token = localStorage.getItem(TOKEN)

  if (!(id || token)) {
    return false
  }

  return true
}

export const LogOut = () => {
  localStorage.removeItem(USER_ID)
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(USER_NAME)
}

export const CreateNewUser = async (
  email: string,
  password: string,
  name: string
) => {
  const user = { email: email, password: password, name: name }
  const create = await createUser(user)

  if (!create.status) {
    await LogIn(email, password)
  }

  if (create.status === 422) {
    alert('The user already exists. Incorrect email or password!')
  }

  if (create.status === 417) {
    await LogIn(email, password)
  }
}

export const LogIn = async (email: string, password: string) => {
  const user = { email: email, password: password }
  const response = await signInUser(user)

  if (!response.status) {
    localStorage.setItem(USER_ID, response.userId)
    localStorage.setItem(TOKEN, response.token)
    localStorage.setItem(USER_NAME, response.name)
  }

  if (response.status === 404) {
    alert('Oops! User does not exist!')
  }

  if (response.status === 403) {
    alert('Oops! Incorrect email or password!')
  }
}
