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

export default Note