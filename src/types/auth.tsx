export enum ButtonNames {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNIN = 'sign in',
  TO_LOGIN = 'back to login',
  TO_SIGNIN = "Don't have an account?",
}

export type ButtonNameTypes = ButtonNames.LOGIN | ButtonNames.LOGOUT

export type TextInput = {
  target: { value: string }
}
