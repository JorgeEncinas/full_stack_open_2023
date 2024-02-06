import PropTypes from 'prop-types'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
  ? "make non" : "make imp"

  return (
    <tr>
      <td className="note">
        { note.content }
      </td>
      <td>
        <button onClick={toggleImportance}>{label}</button>
      </td>
    </tr>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    important: PropTypes.bool,
    content: PropTypes.string
  }),
  toggleImportance: PropTypes.bool
}

export default Note