import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.logedUser)

  const handelLogout = () => {
    window.localStorage.removeItem('BlogListAppUser')
    dispatch(setUser(null))
  }

  const padding = {
    padding: 5
  }


  return (
    <div className='menu'>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      {(!user) ? <button onClick={() => navigate('/login')}>Login</button> :
        <span style={padding}>
          {user.name} logged in
          <button onClick={handelLogout}>logout</button>
        </span>}
    </div>
  )
}

export default Navigation