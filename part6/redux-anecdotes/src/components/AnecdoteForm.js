import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { addNotification, resetNotification } from "../reducers/notificationReducer"

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(asObject(content)))
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);
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
export default AnecdoteForm