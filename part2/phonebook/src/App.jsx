import { useState, useEffect } from 'react'
import DisplayNames from "./components/DisplayNames"
import FilterNames from "./components/FilterNames"
import AddPBEntry from "./components/AddPBEntry"
import axios from 'axios'
import jsonDB from './services/jsondb'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState("")
  const [filterApply, setFilterApply] = useState(false)

  const fetchPeople = () => {
    jsonDB.getAll()
    .then(people => {
      setPersons(people)
    })
  }

  useEffect(fetchPeople,[])

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
        <FilterNames filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
        <AddPBEntry 
          newName = {newName}
          handleNameChange = {handleNameChange}
          newPhone = {newPhone}
          handlePhoneChange = {handlePhoneChange}
        />
      </form>
      <h2>Numbers</h2>
        <DisplayNames persons={filterApply ? showFiltered() : persons}/>
    </div>
  )
}

export default App