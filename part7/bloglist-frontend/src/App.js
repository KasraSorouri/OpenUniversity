import React, { useEffect } from 'react'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from './reducers/blogReducer'
import { loginUser, setUser, userInitialize } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import UserPage from './components/UserPage'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => { dispatch(initialize()) }, [])
  useEffect(() => { dispatch(userInitialize()) },[])

  let blogs = useSelector(state => state.blogs)
  let user = useSelector(state => state.user)
  const state = useSelector(state => state)
  console.log(blogs)
  const handelLogin = ({ username, password }) => {
    dispatch(loginUser(username, password))
  }

  const handelLogout = () => {
    window.localStorage.removeItem('BlogListAppUser')
    dispatch(setUser(null))
  }


  //sortedBlogs = sortedBlogs.sort((a, b) => b.likes - a.likes)
  if (user === null) {
    return (
      <div>
        <Notification  />
        <LoginForm login={handelLogin} />
      </div>
    )
  }
  return (
    <Router>
      <Notification />
      <h2>blogs</h2>
      <h3>
        {user.name} logged in
        <button onClick={handelLogout}>logout</button>
      </h3>
      <Routes>
        <Route path='/users' element={<Users state={{ state }} />} />
        <Route exact path='/' element={<Blogs state={{ state }} />} />
        <Route path='/users/:id' element={<UserPage user={{ state }} />} />
      </Routes>
    </Router>
  )
}

export default App
