import Button from '@mui/material/Button'
import { MUIButtonProps } from '../../../interfaces/sprint'

export default function MUIButton({
  name,
  className,
  sx,
  handler,
}: MUIButtonProps) {
  return (
    <Button
      variant="outlined"
      className={className}
      onClick={handler}
      sx={{
        textTransform: 'none',
        ...sx,
      }}
    >
      {name}
    </Button>
  )
}
