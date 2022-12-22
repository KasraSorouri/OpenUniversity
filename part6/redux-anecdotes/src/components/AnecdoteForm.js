import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { addNotification, resetNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

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
    const response = await anecdoteService.createNew(asObject(content))

    dispatch(newAnecdote(response))
    dispatch(addNotification(response))
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