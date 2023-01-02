import React, { useEffect } from 'react'

import Notification from './components/Notification'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from './reducers/blogReducer'
import { userInitialize } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => { dispatch(initialize()) }, [])
  useEffect(() => { dispatch(userInitialize()) },[])

  const state = useSelector(state => state)

  return (
    <div className='container'>
      <Router>
        <Navigation />
        <Notification />
        <br />
        <br />
        <Routes>
          <Route path='/users' element={<Users state={{ state }} />} />
          <Route exact path='/' element={<Blogs state={{ state }} />} />
          <Route path='/users/:id' element={<UserPage user={{ state }} />} />
          <Route path='/blogs/:id' element={<BlogPage blog={{ state }} />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
