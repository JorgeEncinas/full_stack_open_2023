import { useState } from 'react'

const Blog = ({ blog, handleUpdateBlog }) => {

  const [isVisible, setIsVisible] = useState(false)
  const [blogGiven, setBlogGiven] = useState(blog)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const addLike = async (event) => {
    event.preventDefault()
    //console.log("blog:", blog)
    const response = await handleUpdateBlog({
      ...blog,
      likes: blog.likes+1
    })
    if(response.wasSuccessful) {
      setBlogGiven({...blogGiven, likes: blogGiven.likes+1})
    }
  }

  return (
    <div style={{color: "green",
            border: "2px solid",
            borderColor: "navy",
            marginBottom: "5px",
            marginTop: "5px",
            padding: "5px"}}>
      <span style={{color: "navy"}}>{blog.title}</span> by {blog.author}
      <button
        onClick={toggleVisibility}
        style={{marginLeft: "10px"}}
      >
          {isVisible ? "Hide" : "Show"}
      </button>
      <div>
      {isVisible &&
        <div>
          <p>Author: {blog.author}</p>
          <div style={{display: "flex", alignItems: "center"}}>
            <p style={{marginRight: "10px"}}>Likes: {blogGiven.likes}</p>
            <button 
              onClick={addLike}
            >
              Like
            </button>
          </div>
          <p>Url: {blog.url}</p>
          <p>User that added this:
            <span style={{color: "navy", marginLeft: "5px"}}>
              {blog.user ? blog.user.username : "N/A"}
            </span>
          </p>
        </div>
      }
      </div>
    </div>
  )
}

export default Blog