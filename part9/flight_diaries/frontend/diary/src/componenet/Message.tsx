
const Message = ({ message } : { message: string}) => {
  if(!message) {
    return null;
  }
  return (
    <div style={{color:'red'}} >
      <p>{message}</p>
    </div>
  )
}

export default Message;