import { Box, Typography } from '@mui/material'
import { USER_NAME } from '../../constants/auth'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'

const UserName = () => {
  const userName = localStorage.getItem(USER_NAME)

  return (
    <Box
      className="user-info"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <InsertEmoticonIcon sx={{ width: '16px', mr: '5px' }} />
      <Typography variant="body2">{userName}</Typography>
    </Box>
  )
}

export default UserName
