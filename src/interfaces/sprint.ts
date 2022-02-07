export interface SelectItemProps {
  value: string | number
  name: string | number
}

export interface MUISelectProps {
  title: string
  id: string
  items: SelectItemProps[]
}

export interface MUIButtonProps {
  name: string
  className?: string
  handler: () => void
}
