import { useState, useEffect } from 'react'
import { useNotification } from '../contexts/NotificationContext'

const BlogInput = ({ handleAddBlog, blogAdded, handleBlogAdded }) => {
    
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const { notification, setNotification } = useNotification()

    const handleSubmitBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        handleAddBlog(newBlog)
    }

    useEffect(() => {
        if(blogAdded)
            setTitle("")
            setAuthor("")
            setUrl("")
            handleBlogAdded(false)
    }, [blogAdded])
    
    return (
        <div>
            <form
                onSubmit={handleSubmitBlog}
            >
                <label>Title: </label>
                <input
                    value={title}
                    type="text"
                    placeholder={"Write your title here..."}
                    onChange={(event) => {setTitle(event.target.value)}}
                /> <br/>
                <label>Author: </label>
                <input
                    value={author}
                    type="text"
                    placeholder={"Set the article author"}
                    onChange={(event) => {setAuthor(event.target.value)}}
                /> <br/>
                <label>Url: </label>
                <input
                    value={url}
                    type="text"
                    placeholder={"State the URL"}
                    onChange={(event) => {setUrl(event.target.value)}}
                /> <br/>
                <button>
                    Add
                </button>
                <br/> <br/>
            </form>
        </div>
    )
}

export default BlogInput