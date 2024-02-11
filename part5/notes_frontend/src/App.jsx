import { useState, useEffect } from 'react'
import Notification from "./components/Notification"
import NoteInput from './components/NoteInput'
import NotesDisplay from './components/NotesDisplay'
import Login from './components/Login'
import Footer from "./components/Footer"
import noteService from "./services/notes"
import { NotificationProvider } from './contexts/NotificationContext'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
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
  const handleSetUser = (user) => {
    setUser(user)
  }

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

  /* "Suitable when it's impossible to define the state
  So that the INITIAL RENDERING IS POSSIBLE" -FSO, part 2e.
  if(!notes) {
    return null
  }*/
  return (
    <div>
      <h1>Notes</h1>
      <NotificationProvider>
        <Notification />
        {user 
        ? <Login user={user} handleSetUser={handleSetUser} />
        : <NoteInput addNote={addNote}/>}
        <NotesDisplay />
      </NotificationProvider>
      <Footer />
    </div>
  )
}

export default App
