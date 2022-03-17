import Button from '@mui/material/Button'
import { MUIButtonProps } from '../../../interfaces/sprint'

export default function MUIButton({
  name,
  className,
  sx,
  handler,
  link,
}: MUIButtonProps) {
  return (
    <Button
      variant="outlined"
      className={className}
      onClick={handler}
      href={link}
      sx={{
        textTransform: 'none',
        ...sx,
      }}
    >
      {name}
    </Button>
  )
}
