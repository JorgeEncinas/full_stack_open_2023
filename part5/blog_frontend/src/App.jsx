import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const tokenName = 'blogUser'

  useEffect(() => {
    const userJSON = window.localStorage.getItem(tokenName)
    if (userJSON) {
      const user = JSON.parse(userJSON)
      handleSetUser(user)
    }
  }, [])

  const handleSetUser = (user) => {
    if(user) {
      blogService.setToken(user.token)
      window.localStorage.setItem(tokenName, JSON.stringify(user))
    } else {
      blogService.setToken(null)
      window.localStorage.removeItem(tokenName)
    }
    setUser(user)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Login user={user} handleSetUser={handleSetUser}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App