import {
  createUserWord,
  getUserStatistics,
  getUserWord,
  setUserStatistics,
  updateUserWord,
} from '../components/APIs/api'
import {
  Options,
  UserStatisticsResponse,
  UserWord,
  UserWordParams,
} from '../interfaces/api'
import { UserStatistics, UserGameStatistic } from '../interfaces/statistics'

export const setRandomNumber = (length = 1): number => {
  return Math.round(Math.random() * length)
}

export const RandomPageWords = (num: number): number[] => {
  const result: number[] = []

  while (result.length < num) {
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

export const setAudiocallStats = async () => {
  console.log(1)
}
export const setOrUpdateUserWord = async (
  userId: string,
  wordId: string,
  token: string,
  word: Pick<Options, 'trueAnswers' | 'seriallyAnswer'>
): Promise<void> => {
  const isUserWord = await getUserWord(userId, wordId, token)
  if (isUserWord.status === 200) {
    updateUserWord(
      userId,
      wordId,
      token,
      updateWordParams(isUserWord as UserWord, {
        trueAnswers: word.trueAnswers,
        seriallyAnswer: word.seriallyAnswer,
        studied: (isUserWord as UserWord).optional.studied,
      })
    )
  } else {
    createUserWord(userId, wordId, token, {
      difficulty: 'false',
      optional: {
        trueAnswers: word.trueAnswers,
        seriallyAnswer: word.seriallyAnswer,
        studied: false,
      },
    })
  }
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

export const currentDate = (): string => {
  const date = new Date()

  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear}`
}

export const setUserGameStatistics = async (
  userId: string,
  token: string,
  statistic: UserGameStatistic,
  gameName = 'sprint' || 'audiocall'
): Promise<void> => {
  const oldStatistics = await getUserStatistics(userId, token)
  let newStatistics: UserStatistics
  const dateKey = currentDate()
  if (
    !oldStatistics.status ||
    !(oldStatistics as UserStatisticsResponse).statistics.optional[dateKey]
  ) {
    newStatistics = {
      learnedWords: statistic.newWordsInGame,
      optional: {
        [dateKey]: {
          newWords: statistic.newWordsInGame,
          [gameName]: {
            newWordsInGame: statistic.newWordsInGame,
            rightAnswerPercents: statistic.rightAnswerPercents,
            longestSeries: statistic.longestSeries,
          },
        },
      },
    }
  } else {
    if (
      (oldStatistics as UserStatisticsResponse).statistics.optional[
        dateKey
      ].hasOwnProperty(gameName)
    ) {
      newStatistics = (oldStatistics as UserStatisticsResponse).statistics
      const gameOldStatistics = newStatistics.optional[dateKey][
        gameName
      ] as UserGameStatistic
      newStatistics.optional[dateKey].newWords =
        newStatistics.optional[dateKey].newWords + statistic.newWordsInGame
      newStatistics.optional[dateKey][gameName] = {
        newWordsInGame:
          gameOldStatistics.newWordsInGame + statistic.newWordsInGame,
        rightAnswerPercents:
          (gameOldStatistics.rightAnswerPercents +
            statistic.rightAnswerPercents) /
          2,
        longestSeries: Math.max(
          gameOldStatistics.longestSeries,
          statistic.longestSeries
        ),
      }
    } else {
      newStatistics = (oldStatistics as UserStatisticsResponse).statistics
      newStatistics.optional[dateKey].newWords =
        newStatistics.optional[dateKey].newWords + statistic.newWordsInGame
      newStatistics.optional[dateKey][gameName] = statistic
    }
  }

  setUserStatistics(userId, token, newStatistics)
}

export default setRandomNumber
