import { useState, useEffect } from 'react'
import Note from './components/Note'
//import axios from 'axios'
import noteService from "./services/notes"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import loginService from './services/login'

/*const promise = axios.get("http://localhost:3001/notes")
console.log(promise)

const promise2 = axios.get("http://localhost:3001/foobar")
console.log(promise2)

promise.then(response => {
  console.log(response)
}) */
/*
axios
  .get("http://localhost:3001/notes")
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
*/
/*const DisplayNotes = ({notes}) => {
  const lielmts = notes.map(note =>
  <li key={note.id}>
    {note.content}
  </li>
  )
  return lielmts
}*/

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState("some error happened...")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    //console.log("effect");
    noteService.getAll()
      .then(initialNotes => [
        setNotes(initialNotes)
      ])
  }
  useEffect(hook, [])

  //console.log("render", notes.length, "notes");

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username: username,
        password: password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    //const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => {
      return n.id === id
    })
    const changedNote = {...note, important:!note.important}
    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => {
          return note.id !== id ? note : returnedNote
        }))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server.` 
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
    <input  value={newNote}
            onChange={handleNoteChange} />
    <button type="submit">save</button>
  </form>
  )

  /* "Suitable when it's impossible to define the state
  So that the INITIAL RENDERING IS POSSIBLE" -FSO, part 2e.
  if(!notes) {
    return null
  }*/
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      { user === null ?
        loginForm() :
        "" }
      { user!== null && noteForm() }
     
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <table>
        <tbody>
        {notesToShow.map(note =>
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
        </tbody>
      </table>

      <Footer />
    </div>
  )
}

export default App
