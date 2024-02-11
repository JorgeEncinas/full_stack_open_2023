import PropTypes from 'prop-types'

const NoteInput = ({ newNote, handleNoteChange, addNote}) => {



    return (
        <form onSubmit={addNote}>
        <input  value={newNote}
                onChange={handleNoteChange} />
            <button type="submit">Save</button>
        </form>
    )
}

NoteInput.propTypes = {
    newNote: PropTypes.string,
    handleNoteChange: PropTypes.func,
    addNote: PropTypes.func
}

export default NoteInput