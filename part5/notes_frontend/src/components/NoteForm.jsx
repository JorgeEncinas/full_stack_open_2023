import PropTypes from 'prop-types'

const NoteForm = ({ onSubmit, handleChange, value }) => {

    const [newNote, setNewNote] = useState("")

    const addNote = (event) => {
      event.preventDefault()
      createNote({
        content: newNote,
        important: true
      })
    }

    return (
        <div>
          <h2>Create a new note</h2>
    
          <form onSubmit={onSubmit}>
            <input
              value={value}
              onChange={handleChange}
            />
            <button type="submit">save</button>
          </form>
        </div>
      )
}

NoteForm.propTypes = {
    onSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    value: PropTypes.string
}

export default NoteForm