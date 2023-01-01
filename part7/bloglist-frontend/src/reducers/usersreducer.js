import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addNew(state, action) {
      state.push(action.payload)
    },
    init(state, action) {
      return action.payload
    }
  }
})

export const { addNew, init } = usersSlice.actions

export const usersInitialize = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(init(users))
  }
}

export default usersSlice.reducer