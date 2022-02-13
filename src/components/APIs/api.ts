import * as constApi from '../../constants/api'

import {
  Word,
  User,
  UserWord,
  UserWordParams,
  RejectStatusText,
  AuthUser,
} from '../../interfaces/api'

export const getChunkWords = async (
  group: number,
  page: number
): Promise<Word[] | void> => {
  try {
    const response = await fetch(
      `${constApi.BACKEND_HOSTNAME}/${constApi.URL_WORDS}?group=${group}&page=${page}`
    )

    return response.json()
  } catch (error) {
    console.warn(error as Error)
  }
}

export const getWord = async (wordId: string): Promise<Word | void> => {
  try {
    const response = await fetch(
      `${constApi.BACKEND_HOSTNAME}/${constApi.URL_WORDS}/${wordId}`
    )

    return response.json()
  } catch (error) {
    console.warn(error as Error)
  }
}

export const createUser = async (user: User): Promise<User | string> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  ).then((data) => {
    return data.status == 200
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const getUser = async (
  userId: string,
  token: string
): Promise<User | string> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((data) => {
    return data.status == 200
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const updateUser = async (
  user: User,
  userId: string,
  token: string
): Promise<User | string> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  ).then((data) => {
    return data.status == 200
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const deleteUser = async (
  userId: string,
  token: string
): Promise<string> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((data) => {
    return data.status == 204
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const getNewUserToken = async (
  userId: string,
  refreshToken: string
): Promise<string> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}/${constApi.URL_TOKENS}`,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((data) => {
    return data.status == 204
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const getAllUserWords = async (
  userId: string,
  token: string
): Promise<Word[]> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}/${constApi.URL_WORDS}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((data) => {
    return data.status == 204
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const createUserWord = async (
  userId: string,
  wordId: string,
  token: string,
  worsParams: UserWordParams
): Promise<UserWord | RejectStatusText> => {
  console.log(worsParams)
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}/${constApi.URL_WORDS}/${wordId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(worsParams),
    }
  ).then((data) => {
    return data.status == 200
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const getUserWord = async (
  userId: string,
  wordId: string,
  token: string
): Promise<UserWord | RejectStatusText> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}/${constApi.URL_WORDS}/${wordId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
    .then(async (data) => {
      const word = await data.json()
      word.status = data.status
      return data.status == 200
        ? word
        : { status: data.status, message: data.text() }
    })
    .catch((data) => {
      console.warn(data)
      return { status: 404, message: data }
    })
  return response
}

export const updateUserWord = async (
  userId: string,
  wordId: string,
  token: string,
  worsParams: UserWordParams
): Promise<UserWord | RejectStatusText> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}/${constApi.URL_WORDS}/${wordId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(worsParams),
    }
  ).then((data) => {
    return data.status == 200
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const deleteUserWord = async (
  userId: string,
  wordId: string,
  token: string
): Promise<UserWord | RejectStatusText> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_USERS}/${userId}/${constApi.URL_WORDS}/${wordId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((data) => {
    return data.status == 204
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export const signInUser = async (
  user: User
): Promise<AuthUser | RejectStatusText> => {
  const response = await fetch(
    `${constApi.BACKEND_HOSTNAME}/${constApi.URL_SIGNIN}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  ).then((data) => {
    return data.status == 200
      ? data.json()
      : { status: data.status, message: data.text() }
  })
  return response
}

export default getChunkWords
