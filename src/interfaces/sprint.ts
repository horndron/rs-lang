export interface SelectItemProps {
  value: string | number
  name: string | number
}

export interface MUISelectProps {
  title: string
  id: string
  items: SelectItemProps[]
  getSelectValue: (value: number) => void
  sx?: { [name: string]: string | number | { [name: string]: string | number } }
}

export interface MUIButtonProps {
  name: string
  className?: string
  link?: string
  handler?: () => void
  sx?: { [name: string]: string | number | { [name: string]: string | number } }
}

export interface startGameInTextbook {
  textbook: boolean
  group: number
  page: number
}

export interface GameCardProps {
  title: string
  classname: string
  url: string
  children: React.ReactNode
}

export interface Timer {
  duration: number
  colors?: string[]
}

export interface SprintWordProps {
  word: string
  answer: string
}

export interface RenderTime {
  remainingTime: number
  children: React.ReactNode
}

export interface PreperaGameProps {
  handler: () => void
  sx?: { [name: string]: string | number | { [name: string]: string | number } }
}

export interface ResultsGame {
  true: ResultsQuestionGame[]
  false: ResultsQuestionGame[]
}

export interface ResultsQuestionGame {
  wordId: string
  userId: string
  audio: string
  word: string
  wordTranslate: string
  answer: boolean
}

export interface SprintResultProps {
  trueAnswer: ResultsQuestionGame[]
  falseAnswer: ResultsQuestionGame[]
}
