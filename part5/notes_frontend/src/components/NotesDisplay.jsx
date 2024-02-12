import { useNotification } from "../contexts/NotificationContext"
import noteService from "../services/notes"
import { useState, useEffect } from 'react'
import Note from './Note'
import PropTypes from 'prop-types'

const NotesDisplay = ({ notes, setNotes }) => {
    const [showAll, setShowAll] = useState(true)
    const [ _, setNotification ] = useNotification()

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const hook = () => {
        //console.log("effect");
        noteService.getAll()
          .then(initialNotes => [
            setNotes(initialNotes)
          ])
      }
      useEffect(hook, [])
    
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
    if(notesToShow === undefined || notesToShow === null) {
      return (<div>Nothing to see here...</div>)
    }
    return (
        <div>
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
        </div>
    )
}

NotesDisplay.propTypes = {
  notes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.array]).isRequired,
  setNotes: PropTypes.func.isRequired
}

export default NotesDisplay