const Message = ({ message }) => {
  if(message === null) {
    return null
  }
  return (
    <div className="message">
      <h2>{message}</h2>
    </div>
  )
}

export default Message