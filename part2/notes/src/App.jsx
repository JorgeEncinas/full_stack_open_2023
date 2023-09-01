import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

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
const DisplayNotes = ({notes}) => {
  const lielmts = notes.map(note =>
  <li key={note.id}>
    {note.content}
  </li>
  )
  return lielmts
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    //console.log("effect");
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        //console.log("promise fulfilled")
        setNotes(response.data)
      })
  }

  //Alternate versions
  /*
  useEffect(() => {
    console.log("effect")

    const eventHandler = response => {
      console.log("promise fulfilled")
      setNotes(response.data)
    }
    //const promise = axios.get("http://localhost:3001/notes")
    //promise.then(eventHandler)
    axios
      .get("http://localhost:3001/notes")
      .then(eventHandler)
  }, [])
  */
 /* //ALTERNATE VERSION 2, COMPACT.
  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        console.log("promise fulfilled");
        setNotes(response.data);
      })
  }, [])
  */
  useEffect(hook, [])

  //console.log("render", notes.length, "notes");

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    /*
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
  } */

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    axios
      .post("http://localhost:3001/notes", noteObject)
      .then(response => {
        console.log(response)
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
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
