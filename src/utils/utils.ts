export const setRandomNumber = (length = 1): number => {
  return Math.round(Math.random() * length)
}

export const threeRandomPageWords = (): number[] => {
  const LENGTH = 3
  const result: number[] = []

  while (result.length < LENGTH) {
    const pageNum = setRandomNumber(29)

    if (!result.includes(pageNum)) result.push(pageNum)
  }

  return result
}

const regExp = {
  password: /[0-9a-zA-Z!@#$%^&_*]{8,}/,
  // TODO: replace regExp, improve password requirements
  // password: /(?=.*[0-9])(?=.*[!@#$%^&+_*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&_*]{8,}/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
}

export const validatePassword = (password: string): boolean => {
  return regExp.password.test(password)
}

export const validateEmail = (email: string): boolean => {
  return regExp.email.test(email)
}

export default setRandomNumber
