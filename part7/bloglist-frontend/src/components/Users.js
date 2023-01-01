import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersInitialize } from '../reducers/usersreducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(usersInitialize())
  }, [])

  console.log('users ->', users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
        </thead>
        <tbody>
          <tr>
            <th>user</th>
            <th>blogs</th>
          </tr>

          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>)
          )}

        </tbody>
      </table>
    </div>
  )
}

export default Users
