import { createSlice } from "@reduxjs/toolkit"

const initialState = null
const notificatoinSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return `anecdote " ${action.payload} " is added to the list`
    },

    voteNotification(state, action) {
      return ` you voted to the " ${action.payload} "`
    },
    resetNotification(state, action) {
       return null
     }
  }
})

export const { addNotification, voteNotification, resetNotification } = notificatoinSlice.actions
export default notificatoinSlice.reducer