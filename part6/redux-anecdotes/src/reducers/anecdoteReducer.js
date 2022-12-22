import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"
 
const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    addVoteOf(state, action) {
      const id = action.payload.id
      const newNote = action.payload
      return state.map(note => note.id !== id ? note : newNote)
    },
    addNew(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
  
  
export const { addVoteOf, addNew, setAnecdotes } = anecdoteSlicer.actions 
 
export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = newAnecdote => {
  return async dispatch => {
    const response = await anecdotesService.createNew(newAnecdote)
    dispatch(addNew(response))
  }
}

export const updateAnecdote = anecdote => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const response = await anecdotesService.updateData(anecdote.id, newAnecdote)
    dispatch(addVoteOf(response))
  }
}

export default anecdoteSlicer.reducer