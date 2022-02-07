import * as React from 'react'
import Button from '@mui/material/Button'
import { MUIButtonProps } from '../../../interfaces/sprint'

export default function MUIButton({ name, handler }: MUIButtonProps) {
  return (
    <Button variant="outlined" onClick={handler}>
      {name}
    </Button>
  )
}
