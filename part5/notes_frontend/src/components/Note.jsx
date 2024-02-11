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
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    important: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired,
  toggleImportance: PropTypes.func.isRequired
}

export default Note