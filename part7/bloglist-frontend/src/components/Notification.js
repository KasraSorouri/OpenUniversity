import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message === null) {
    return null
  }
  return (
    <Alert severity="success">
      {message}
    </Alert>
  )
}

export default Notification
