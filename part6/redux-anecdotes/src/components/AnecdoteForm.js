//import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const AnecdoteForm = (props) => {
 // const dispatch = useDispatch()
  const  timeoutId = props.notification.timeoutId
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
 //   dispatch(createAnecdote(asObject(content)))
 //   dispatch(setNotification(`new anecdote '${content}'`, 10))
    props.createAnecdote(asObject(content))
    props.setNotification(`new anecdote '${content}'`, 5, timeoutId)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}
//export default AnecdoteForm
const mapStateToProps = (state) => {
  return { notification: state.notification }
}
const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(mapStateToProps,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm