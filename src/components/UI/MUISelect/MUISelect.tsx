import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { MUISelectProps } from '../../../interfaces/sprint'

export default function MUISelect({ title, id, items }: MUISelectProps) {
  const [selectValue, setSelectValue] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={id + '-label'}>{title}</InputLabel>
        <Select
          labelId={id + '-label'}
          id={id}
          value={selectValue}
          label={title}
          onChange={handleChange}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
