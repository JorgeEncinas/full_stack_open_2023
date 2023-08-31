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
    { name: 'Arto Hellas', phone: "555-12345", id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState("")
  const [filterApply, setFilterApply] = useState(false)

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
    if(filterName.length > 0) {
      setFilterApply(true)
    } else {
      setFilterApply(false)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const showFiltered = () => {
    return persons.filter((person) => {
      //console.log(person)
      return (person.name.toLowerCase()).includes(filterName.toLowerCase())
    })
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
        <h3>Filter</h3>
        <input
          value={filterName}
          onChange={handleFilterNameChange}
        />
        <hr />
        <h1>Add new entry to phonebook</h1>
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
        <DisplayNames persons={filterApply ? showFiltered() : persons}/>
    </div>
  )
}

export default App