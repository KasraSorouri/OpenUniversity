import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificatoinSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      console.log('action -> ', action )
      return action.payload
    },
    resetNotification() {
      return initialState
    }
  }
})

export const { addNotification, voteNotification, resetNotification } = notificatoinSlice.actions
let timeoutId = undefined
export const setNotification = (text, time) => {

  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  return dispatch => {
    dispatch(addNotification(text))
    timeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

export default notificatoinSlice.reducer