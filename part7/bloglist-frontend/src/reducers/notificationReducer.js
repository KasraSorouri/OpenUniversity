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

  console.log('**** Timeout Id -> ', timeoutId, 'time -> ',time)

  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  return dispatch => {
    dispatch(addNotification(text))
    console.log('text ->',text)
    timeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
    console.log('Timeout Id -> ', timeoutId)
  }
}

export default notificatoinSlice.reducer