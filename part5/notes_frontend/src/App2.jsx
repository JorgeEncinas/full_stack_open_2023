import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import noteService from './services/notes'
import NoteForm from './components/NoteForm'

const App2 = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    const [notes, setNotes] = useState([])

    useEffect(() => {
        //console.log("effect");
        noteService.getAll()
          .then(initialNotes => [
            setNotes(initialNotes)
          ])
        }, [])

    useEffect(() => {
        if(notification) {
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }, [notification])

    useEffect(() => {
        //console.log("running new effect")
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if(loggedUserJSON) {
          //console.log("found user")
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          //noteService.setToken(user.token) //handled by next useEffect
        }
    }, [])
    
    useEffect(() => {
        if (user)
          noteService.setToken(user.token)
    }, [user])
    

    const addNote = (noteObject) => {
        noteService.create(noteObject)
          .then(returnedNote => {
            console.log(returnedNote)
            setNotes(notes.concat(returnedNote))
          })
    }

    const attemptLogin = () => {

    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({
                username: username,
                password: password
            })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            setNotification({
                class: 'error',
                message: 'Wrong credentials',
                delayMillis: 5000
            })
        }
    }

    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }

        const handleLogin = () => {

        }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>log in</button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }

    

    return (
        <div>
            {notification &&
                <div className={notification.class}>
                    {notification.message}
                </div>
            }
            <Togglable buttonLabel='Login'>
                <LoginForm
                    attemptLogin={attemptLogin}
                />
            </Togglable>
            <Togglable>
                <NoteForm
                   createNote={addNote}
                />
            </Togglable>
        </div>
    )
}

export default App2