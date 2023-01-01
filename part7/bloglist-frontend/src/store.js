import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersreducer'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    logedUser: userReducer,
    users: usersReducer
  },
})

export default store