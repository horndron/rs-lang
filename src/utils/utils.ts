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

export default setRandomNumber
