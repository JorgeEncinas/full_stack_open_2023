import { useState } from 'react'
import reactLogo from './assets/react.svg'

const DisplayNotes = ({notes}) => {
  const lielmts = notes.map((note,i) =>
  <li key={i}>
    {note.content}
  </li>
  )
  return lielmts
}

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            {note.content}
          </li>
        )}
        <DisplayNotes notes={notes} />
      </ul>
    </div>
  )
}

export default App
