import { useState } from "react"

const Blog = ({ blog, likeHandler , user , deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  const addLike = () => {
    console.log('add like', blog.likes);
    blog.likes ++
    likeHandler(blog)
  }

  const [detailShow, setdetailShow] = useState(false)

  const hideWhenVisible = { display: detailShow ? 'none' : '' }
  const showWhenVisible = { display: detailShow ? '' : 'none' }

  const toggleVisibility = () => {
    setdetailShow(!detailShow)
  }

  const removeBlog = async (blog) => {
    console.log('Remove request ->', blog)

    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  //console.log('blog ->', blog.user);
  //console.log('user ->', user.id);
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} 
        <button onClick={toggleVisibility}> show</button>
      </div>
      <div style={showWhenVisible} >
        {blog.title}
        <button onClick={toggleVisibility}> hide</button>
        <br/>{blog.url}
        <br/>likesL: {blog.likes}
        <button onClick={addLike}>like</button>
        <br />{blog.author}
        <br />{blog.user.id === user.id ? <button onClick={()=> removeBlog(blog)} >Remove</button> : null}
      </div>

    </div>


  )
}
  

export default Blog