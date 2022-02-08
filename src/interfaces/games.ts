export interface SelectItemProps {
  value: string | number
  name: string | number
}

export interface MUISelectProps {
  title: string
  id: string
  items: SelectItemProps[]
  getSelectValue: (value: number) => void
}

export interface MUIButtonProps {
  name: string
  className?: string
  link?: string
  handler?: () => void
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

export interface SprintWordProps {
  word: string
}
