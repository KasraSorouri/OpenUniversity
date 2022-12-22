import { useDispatch, useSelector } from "react-redux"
import { addVoteOf } from "../reducers/anecdoteReducer"
import { voteNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => a.votes > b.votes ? -1 : 1))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(addVoteOf(anecdote.id))
    dispatch(voteNotification(anecdote.content))

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