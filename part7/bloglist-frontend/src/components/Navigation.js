import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material'

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.logedUser)

  const handelLogout = () => {
    window.localStorage.removeItem('BlogListAppUser')
    dispatch(setUser(null))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to='/'>
          Blogs
        </Button>
        <Button color="inherit" component={Link} to='/users'>
          Users
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {(!user) ? <Button color="inherit" onClick={() => navigate('/login')}>Login</Button> :
          <span>
            {user.name} logged in
            <Button color="inherit" onClick={handelLogout}>logout</Button>
          </span>}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation