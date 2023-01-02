import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={handelLogin}>
      <h2>Login</h2>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="Text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <br />
      <Button type="submit">login</Button>
    </Form>
  )
}

LoginForm.prototype = {
  login: PropTypes.func.isRequired,
}
export default LoginForm
