import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addComment, initialize } from '../reducers/blogReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogPage = (id) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

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
      comments: blog.comments,
      likes: blog.likes + 1,
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

  const addCommentHandler = (event) => {
    event.preventDefault()
    if (comment.length > 1) {
      try {
        console.log('blog add blog ->', comment)
        dispatch(addComment(blog.id, comment))
        dispatch(setNotification(`A new commnet ${comment} is added for blog ${blog.title}`, 5))
        setComment('')
      } catch (e) {
        console.log(e)
        dispatch(setNotification(e, 3))
      }
    } else {
      dispatch(setNotification('Comment shoud not be empty!',5))
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
      <br />
      <br />
      <h2>Commnets</h2>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment || ''}
          name="commnet"
          placeholder="commnet"
          onChange={({ target }) =>
            setComment( target.value )
          }
        />
        <button onClick={addCommentHandler} id="addCommnet" >
          Add Commnet
        </button>
      </form>


      {blog.comments.map(comment => (
        <li key={comment}> {comment} </li>
      ))}
    </div>
  )
}

export default BlogPage