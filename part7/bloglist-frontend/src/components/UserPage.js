
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { usersInitialize } from '../reducers/usersreducer'

const UserPage = (id) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(usersInitialize())
  }, [])
  const userId = useParams(id)
  const user = useSelector(state => state.users.filter(user => user.id === userId.id)[0])
  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}


    </div>
  )
}

export default UserPage