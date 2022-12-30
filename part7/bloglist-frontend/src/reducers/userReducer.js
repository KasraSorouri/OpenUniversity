import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'


const userSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    setUser(state, action) {
      console.log('set user test ->', action.payload)
      return action.payload
    }
  }

})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    console.log('credencials -> username:', username, '  pass:', password)
    try {
      const user = await loginService({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('BlogListAppUser', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (e) {
      console.log(e)
    }

  }
}

export const userInitialize = () => {
  return dispatch => {
    const loggedUserJson = window.localStorage.getItem('BlogListAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export default userSlice.reducer