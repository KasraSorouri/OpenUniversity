import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handelLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setPassword('')
    setUsername('')
    navigate('/')
  }

  return (
    <form onSubmit={handelLogin}>
      <h2>Login</h2>
      <div>
        username:
        <input
          type="Text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button type="submit">login</button>
    </form>
  )
}

LoginForm.prototype = {
  login: PropTypes.func.isRequired,
}
export default LoginForm
