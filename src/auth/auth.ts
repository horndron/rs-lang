import { TOKEN, USER_ID } from '../constants/auth'
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
}

export const CreateNewUser = async (email: string, password: string) => {
  const user = { email: email, password: password }
  const create = await createUser(user)

  if (!create.status) {
    await LogIn(email, password)
  }

  if (create.status === 422) {
    alert('incorrect email or password') // TODO: fix alert
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
  }

  if (response.status === 403) {
    alert('incorrect email or password') // TODO: fix alert
  }
}
