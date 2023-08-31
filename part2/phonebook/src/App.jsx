import { useState } from 'react'

const DisplayName = ({ person }) => {
  return (
    <div> {person.name} </div>
  )
}

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNameSubmit = (event) => {
    event.preventDefault()
    //A method I devised using "filter", idk how efficient it is.
    
    if (persons.filter((person) => newName.toLowerCase() === person.name.toLowerCase()).length = 0) {
      setPersons(persons.concat({ name: newName }))
      setNewName("")
    } else {
      alert(`"${newName}" is already registered`)
    }
    //A method following Mozilla docs.
    /*
    if (!persons.includes(newName)) {
      setPersons(persons.concat({ name: newName }))
      setNewName("")
    } */
  }

  //NOTE: the order of "value" and "onChange" matters
  //For the input element. I put them backwards and
  //Received an error msg

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNameSubmit}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange} 
                 />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <DisplayNames persons={persons}/>
    </div>
  )
}

export default App