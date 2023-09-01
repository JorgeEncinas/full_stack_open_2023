import DisplayName from "./DisplayName"

const DisplayNames = ({persons, operationFunctions}) => {
    const peopleStruct = persons.map((person) => {
      return <DisplayName key={person.name} person={person} operationFunctions={operationFunctions} />
    })
    //console.log("peopleStruct", peopleStruct)
    return (
      <table>
        <tbody>
          {peopleStruct}
        </tbody>
      </table>
    )
}

export default DisplayNames