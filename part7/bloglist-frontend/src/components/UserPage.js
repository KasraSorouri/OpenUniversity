
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
  const blogs = user.blogs
  console.log('userBlog user ->', user, 'user blogs ->',blogs )
  return (
    <div>
      <h3>{user.name}</h3>
      {blogs.map((blog) => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}


    </div>
  )
}

export default UserPage