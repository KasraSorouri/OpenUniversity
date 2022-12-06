import { useState } from "react"

const Blog = ({ blog, likeHandler }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailShow, setdetailShow] = useState(false)

  const hideWhenVisible = { display: detailShow ? 'none' : '' }
  const showWhenVisible = { display: detailShow ? '' : 'none' }

  const toggleVisibility = () => {
    setdetailShow(!detailShow)
  }
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
        <button onClick={likeHandler}>like</button>
        <br/>{blog.author}
      </div>

    </div>


  )
}
  

export default Blog