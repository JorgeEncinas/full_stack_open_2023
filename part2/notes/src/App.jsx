import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from "./services/notes"
import Notification from "./components/Notification"
import Footer from "./components/Footer"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState("some error happened...")

  const hook = () => {
    //console.log("effect");
    noteService.getAll()
      .then(initialNotes => [
        setNotes(initialNotes)
      ])
  }
  useEffect(hook, [])

  //console.log("render", notes.length, "notes");

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
  
  /* "Suitable when it's impossible to define the state
  So that the INITIAL RENDERING IS POSSIBLE" -FSO, part 2e.
  if(!notes) {
    return null
  }*/
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <table>
        <tbody>
        {notesToShow.map(note =>
          <Note key={note.id} note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
        </tbody>
      </table>
      <form onSubmit={addNote}>
        <input  value={newNote}
                onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
