import DisplayName from "./DisplayName"

const DisplayNames = ({persons}) => {
    const peopleStruct = persons.map((person) => {
      return <DisplayName key={person.name} person={person} />
    })
    //console.log("peopleStruct", peopleStruct)
    return (
      <>
        {peopleStruct}
      </>
    )
}

export default DisplayNames