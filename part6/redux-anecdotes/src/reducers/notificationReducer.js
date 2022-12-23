import { createSlice } from "@reduxjs/toolkit"

const initialState = null
const notificatoinSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
       return null
     }
  }
})

export const { addNotification, voteNotification, resetNotification } = notificatoinSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(addNotification(text))
    setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000);
  }
}

export default notificatoinSlice.reducer