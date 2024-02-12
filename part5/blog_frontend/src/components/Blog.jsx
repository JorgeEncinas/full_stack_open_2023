import { useState } from 'react'

const Blog = ({ blog }) => {

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

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
            <p style={{marginRight: "10px"}}>Likes: {blog.likes}</p>
            <button>Like</button>
          </div>
          <p>Url: {blog.url}</p>
        </div>
      }
      </div>
    </div>
  )
}

export default Blog