const DisplayName = ({ person }) => {
    //NOTE: "person.phone || person.number" was an idea I took
    //From seeing a tweet from Freya Holmer managing cache on some Unity stuff she was working on.
    //I saw the "||" syntax, and was curious if it would work here.
    //And it did.
    return (
      <div> {person.name}: {person.phone || person.number} </div>
    )
}

export default DisplayName