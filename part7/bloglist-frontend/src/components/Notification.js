import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  console.log('Notification message ->', message)
  if (message === null) {
    return null
  }
  return (
    <div className="message">
      <h2>{message}</h2>
    </div>
  )
}

export default Notification
