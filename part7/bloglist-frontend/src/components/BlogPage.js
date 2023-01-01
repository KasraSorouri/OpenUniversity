import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { initialize } from '../reducers/blogReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const BlogPage = (id) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(initialize())
  }, [])
  const blogId = useParams(id)
  const blog = useSelector(state => state.blogs.filter(blog => blog.id === blogId.id)[0])
  const user = useSelector(state => state.logedUser)

  //console.log('blogPage blog->', blog , 'blogPage blogId ->', blogId)

  const addLike = () => {
    console.log('add like')
    const editedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1,
      user: blog.user.id || blog.user,
    }
    dispatch(updateBlog(editedBlog))
  }

  const removeBlog = async (blog) => {
    console.log('Remove request ->', blog)

    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      const id = blog.id
      dispatch(deleteBlog(id))
      navigate('/')
      console.log('Remove confirm ->', blog)
    }
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      <a href={`${blog.url}`}>{blog.url}</a>
      <br />
      <span id="likes">{blog.likes}</span> {(blog.likes === 1) ? <span>like</span> :<span>likes</span>}
      <button onClick={addLike} id="like">
          like
      </button>
      <br/>
      <strong>Added by {blog.user.name}</strong>
      <br/>
      {blog.user.id === user.id ? (
        <button onClick={() => removeBlog(blog)} id="delete">
            Remove
        </button>
      ) : null}
    </div>
  )
}

export default BlogPage