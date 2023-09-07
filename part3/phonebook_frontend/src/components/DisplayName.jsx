const DisplayName = ({ person, operationFunctions }) => {
    //NOTE: "person.phone || person.number" was an idea I took
    //From seeing a tweet from Freya Holmer managing cache on some Unity stuff she was working on.
    //I saw the "||" syntax, and was curious if it would work here.
    //And it did.
    return (
      <tr>
        <td>
        {person.name}: {person.phone || person.number}
        </td>
        <td>
          <button onClick={operationFunctions.handleDelete(person.id, person.name)}>delete</button>
        </td>
      </tr>
    )
}

export default DisplayName