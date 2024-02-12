import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import noteService from './services/notes'
import NoteForm from './components/NoteForm'
import Note from './components/Note'

const App2 = () => {
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const [notes, setNotes] = useState([])

    const noteFormRef = useRef()


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
            noteFormRef.current.toggleVisibility()
            setNotes(notes.concat(returnedNote))
          })
          .catch(error => {
            console.log(error)
          })
    }

    const attemptLogin = async (loginObject) => {
        try {
            const user = await loginService.login(loginObject)
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            setUser(user)
            return {
                wasSuccessful: true,
                message: 'Login Successful'
            }
        } catch (error) {
            return {
                wasSuccessful: false,
                message: error
            }
        }
    }

    const handleLogout = () => {
        setUser(null)
        noteService.setToken(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }

    const toggleImportanceOf = (noteId) => {
        console.log(`importance of ${noteId} needs to be toggled`)
        //const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => {
          return n.id === noteId
        })
        const changedNote = {...note, important:!note.important}
        noteService.update(noteId, changedNote)
          .then(returnedNote => {
            setNotes(notes.map(note => {
              return note.id !== noteId ? note : returnedNote
            }))
          })
          .catch(_ => {
            setNotification({
              class: 'error',
              message: `Note '${note.content}' was already removed from server.`,
              delayMillis: 5000
            })
            setNotes(notes.filter(n => n.id !== noteId))
          })
    }

    return (
        <div>
            {notification &&
                <div className={notification.class}>
                    {notification.message}
                </div>
            }
            {!user &&
                <Togglable buttonLabel='Login'>
                    <LoginForm
                        attemptLogin={attemptLogin}
                    />
                </Togglable>
            }
            {user &&
            <div>
                <div>Logged in as {user.name} ({user.username})</div>
                <button type="button"
                    onClick={handleLogout}
                >
                    Log out.
                </button>
            </div>
            }
            {user &&
            <Togglable buttonLabel='Create new note' ref={noteFormRef}>
                <NoteForm
                    createNote={addNote}
                />
            </Togglable>
            }
            {notes.map(note => {
                <Note note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
            })}
        </div>
    )
}


export default App2