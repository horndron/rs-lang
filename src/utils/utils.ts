import {
  createUserWord,
  getUserWord,
  updateUserWord,
} from '../components/APIs/api'
import { Options, UserWord, UserWordParams } from '../interfaces/api'

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

const updateWordParams = (
  oldParams: UserWord,
  newParams: Options
): UserWordParams => {
  return {
    difficulty: oldParams.difficulty,
    optional: {
      trueAnswers: oldParams.optional.trueAnswers + newParams.trueAnswers,
      seriallyAnswer:
        newParams.seriallyAnswer === 0
          ? 0
          : newParams.seriallyAnswer + oldParams.optional.seriallyAnswer,
      studied:
        newParams.seriallyAnswer === 0 ||
        newParams.seriallyAnswer + oldParams.optional.seriallyAnswer < 3
          ? false
          : true,
    },
  }
}

export const setOrUpdateUserWord = async (
  userId: string,
  wordId: string,
  token: string,
  word: Pick<Options, 'trueAnswers' | 'seriallyAnswer'>
): Promise<void> => {
  const isUserWord = await getUserWord(userId, wordId, token)
  isUserWord.status === 200
    ? updateUserWord(
        userId,
        wordId,
        token,
        updateWordParams(isUserWord as UserWord, {
          trueAnswers: word.trueAnswers,
          seriallyAnswer: word.seriallyAnswer,
          studied: (isUserWord as UserWord).optional.studied,
        })
      )
    : createUserWord(userId, wordId, token, {
        difficulty: 'false',
        optional: {
          trueAnswers: word.trueAnswers,
          seriallyAnswer: word.seriallyAnswer,
          studied: false,
        },
      })
}

export default setRandomNumber
