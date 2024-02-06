import { useState } from 'react'
import PropTypes from 'prop-types'

const NoteInput = ({addNote}) => {

    const [newNote, setNewNote] = useState("a new note...")

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    return (
        <form onSubmit={addNote}>
        <input  value={newNote}
                onChange={handleNoteChange} />
            <button type="submit">Save</button>
        </form>
    )
}

NoteInput.propTypes = {
    addNote: PropTypes.func
}

export default NoteInput