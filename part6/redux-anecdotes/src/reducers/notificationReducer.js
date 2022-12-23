import { createSlice } from "@reduxjs/toolkit"

const initialState = {text: null, timeoutId: undefined}
const notificatoinSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
       return initialState
     }
  }
})

export const { addNotification, voteNotification, resetNotification } = notificatoinSlice.actions

export const setNotification = (text, time, timeoutId) => {

  console.log('**** Timeout Id -> ', timeoutId);

  clearTimeout(timeoutId)
  return dispatch => {
    timeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000);
    dispatch(addNotification({text,timeoutId}))

    console.log('Timeout Id -> ', timeoutId);
  }
}

export default notificatoinSlice.reducer