import { useState } from 'react'

const DisplayName = ({ person }) => {
  return (
    <div> {person.name}: {person.phone} </div>
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
    { name: 'Arto Hellas', phone: "555-12345" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhonebookSubmit = (event) => {
    event.preventDefault()
    //A method I devised using "filter", idk how efficient it is.
    
    const personsFilter = persons.filter((person) => {
      return (newName.toLowerCase() === person.name.toLowerCase()
      || newPhone.trim(" ").trim("-") === person.phone.trim(" ").trim("-"))
    })
    
    if (personsFilter.length == 0) {
      setPersons(persons.concat({ name: newName, phone: newPhone }))
      setNewName("")
      setNewPhone("")
    } else {
      alert(`Either name: "${newName}" or the phone # ${newPhone} is already registered`)
    }
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  //NOTE: the order of "value" and "onChange" matters
  //For the input element. I put them backwards and
  //Received an error msg

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePhonebookSubmit}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange} 
                 />
        </div>
        <div>
          phone number:
          <input
            value={newPhone}
            onChange={handlePhoneChange}
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