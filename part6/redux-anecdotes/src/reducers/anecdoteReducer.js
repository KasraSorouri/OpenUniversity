import { createSlice } from "@reduxjs/toolkit"

const initialState = []
const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVoteOf(state, action) {
      const id = action.payload
      const note = state.find(n => n.id === id)
      const newNote = { ...note, votes: note.votes + 1 }
      return state.map(note => note.id !== id ? note : newNote)
    },
    newAnecdote(state, action) {
      
      return state.concat((action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
  
  
 export const { addVoteOf, newAnecdote, setAnecdotes } = anecdoteSlicer.actions 

export default anecdoteSlicer.reducer