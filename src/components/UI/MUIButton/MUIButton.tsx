import * as React from 'react'
import Button from '@mui/material/Button'
import { MUIButtonProps } from '../../../interfaces/sprint'

export default function MUIButton({
  name,
  className,
  handler,
  link,
}: MUIButtonProps) {
  return (
    <Button
      variant="outlined"
      className={className}
      onClick={handler}
      href={link}
    >
      {name}
    </Button>
  )
}
