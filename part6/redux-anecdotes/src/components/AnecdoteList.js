import { useDispatch, useSelector } from "react-redux"
import { addVoteOf } from "../reducers/anecdoteReducer"
import { voteNotification, resetNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
 
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote =>
      anecdote.content.includes(filter))
      .sort((a, b) => a.votes > b.votes ? -1 : 1))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    
    console.log('vote', anecdote)
    dispatch(addVoteOf(anecdote.id))
    dispatch(voteNotification(anecdote.content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);

  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList