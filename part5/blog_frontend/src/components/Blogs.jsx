import { useState, useEffect, useRef } from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import Login from '../components/Login'
import BlogInput from '../components/BlogInput'
import { useNotification } from '../contexts/NotificationContext'
import Togglable from './Togglable'

const Blogs = () => {

    const [blogAdded, setBlogAdded] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const { _notification, setNotification } = useNotification()
  
    const tokenName = 'blogUser'
  
    useEffect(() => {
      const userJSON = window.localStorage.getItem(tokenName)
      if (userJSON) {
        const user = JSON.parse(userJSON)
        handleSetUser(user)
        blogService.setToken(user.token)
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
  
    const handleAddBlog = async (newBlog) => {
      try {
        const blogAdded = await blogService.create(newBlog)
        if (blogAdded) {
          console.log(blogAdded)
          setBlogAdded(true)
          setBlogs(blogs.concat(blogAdded))
          setNotification({
            class: 'success',
            message: 'Blog added successfully',
            delayMillis: 5000
            })
          return {
            wasSuccessful: true
          }
        }
      } catch (error) {
        setNotification({
            class: 'error',
            message: error.response.data?.error,
            delayMillis: 8000
        })
        return {
          wasSuccessful: false
        }
      }
    }

    const handleUpdateBlog = async (editedBlog) => {
      try {
        /*const editedBlog = {
          ...blog,
          likes: blog.likes+1
        }*/
        console.log("editedBlog on Blogs: ", editedBlog)
        let updatedBlog = await blogService
          .update(editedBlog)
        if(updatedBlog) {
          console.log("updated blog: ", updatedBlog)
          setNotification({
            class: 'succcess',
            message: 'blog update successful'
          })
          //Used chatgpt to help me figure this one out...
          //Check part5/blog_frontend/references.txt [1]
          return {
            wasSuccessful: true
          }
        }
      } catch (error) {
        console.log(error)
        setNotification({
          class: "error",
          message: error.response?.data?.error,
          delayMillis: 8000
        })
        return {
          wasSuccessful: false
        }
      }
    }
  
    useEffect(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }, [])
    //blogAdded={blogAdded}
    //handleBlogAdded={handleBlogAdded}

    return (
        <div>
            <Login user={user} handleSetUser={handleSetUser}/>
            {user &&
            <Togglable showLabel={'Add new blog'} hideLabel={'Cancel adding'}>
                <BlogInput
                  handleAddBlog={handleAddBlog}
                />
            </Togglable>
            }
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}
              handleUpdateBlog={handleUpdateBlog}
            />
            )}
        </div>
    )
}

export default Blogs