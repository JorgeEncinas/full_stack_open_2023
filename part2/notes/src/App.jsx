import { useState } from 'react'
import Note from './components/Note'


const DisplayNotes = ({notes}) => {
  const lielmts = notes.map(note =>
  <li key={note.id}>
    {note.content}
  </li>
  )
  return lielmts
}

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.importante === true)

  const addNote = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length+1
    }
    //const notesCopy = {...notes,  noteObject}
    //setNotes(notesCopy)}
    setNotes(notes.concat(noteObject)) //Concat creates a copy! convenient
    setNewNote("")
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input  value={newNote}
                onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App