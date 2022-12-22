import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"
 
const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    addVoteOf(state, action) {
      const id = action.payload
      const note = state.find(n => n.id === id)
      const newNote = { ...note, votes: note.votes + 1 }
      return state.map(note => note.id !== id ? note : newNote)
    },
    addNew(state, action) {
      console.log(' meeeee ->', action);
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
    console.log('response *** -> ', response)
    dispatch(addNew(response))
  }
}

export default anecdoteSlicer.reducer