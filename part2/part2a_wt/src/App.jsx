import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Note from './components/Note'


const DisplayNotes = ({notes}) => {
  const lielmts = notes.map(note =>
  <li key={note.id}>
    {note.content}
  </li>
  )
  return lielmts
}

const App = ({notes}) => {

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
