import { useState, useEffect } from 'react'
import DisplayNames from "./components/DisplayNames"
import FilterNames from "./components/FilterNames"
import AddPBEntry from "./components/AddPBEntry"
import jsonDB from './services/jsondb'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState("")
  const [filterApply, setFilterApply] = useState(false)

  const fetchPeople = () => {
    jsonDB.getAllPersons()
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
    //Replace All https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
    //U really should use a RegEx to filter out numbers and names that are
    //"The same" but manipulated to be able to add them
    //But I think it's outside the scope,
    //And it would require a lot of reading.

    const newPhoneTrimmed = newPhone.trim().replaceAll(" ", "").replaceAll("-", "");
    const newNameTrimmed = newName.toLowerCase().trim().replaceAll(" ", "");

    if (newPhoneTrimmed.length < 1 || newNameTrimmed.length < 1) {
      alert("Please fill the form completely")
    } else {
      const personsFilter = persons.filter((person) => {
        return newNameTrimmed === person.name.toLowerCase().trim().replaceAll(" ", "")
      })
  
      const phoneFilter = persons.filter((person) => {
        let numberSimplified = person.number.trim().replaceAll(" ", "").replaceAll("-", "")
        return newPhoneTrimmed === numberSimplified;
      })
      ///Combinations...
      // Phone is Registered (X) ____ Person is Registered (Y) ____ Response (Z)
      //       T                          F                   "Phone is taken"
      //       T                          T                   "Phone and person registered". Actually, it won't go into this situation.
      //       F                          T                   "Update person's number?"
      //       F                          F                   "Go ahead"
  
      if (phoneFilter.length > 0) { //Takes care of cases X=T. Either way, you won't be able to make a change.
        alert("This number is already registered")
      }
      else if (personsFilter.length > 0) { // X=F, Y=T
        //NOTE: Getting here implies the phone number's new
        //If there's more than one person (which there shouldn't be)
        //Then just take the very first person.
        const existingPerson = personsFilter[0];
        const confirmPhoneChangeMessage = `"${existingPerson.name}" has already been added 
        with number "${existingPerson.number}". Do you want to change their 
        number to "${newPhone}"?`
        if (window.confirm(confirmPhoneChangeMessage)) {
            existingPerson.number = newPhone
            const updatedPerson = jsonDB.updatePerson(
              existingPerson.id,
              existingPerson)
            setPersons(persons.map(person => {
              return updatedPerson.id !== person.id ? person : updatedPerson
            }))
            setNewName("")
            setNewPhone("")
        }
      } else if(personsFilter.length === 0) { //X = F, Y = F
        jsonDB.createPerson({
          name: newName,
          number: newPhone
        })
        .then(personCreated => {
          setPersons(persons.concat(personCreated))
          setNewName("")
          setNewPhone("")
        })
        .catch(error => {
          alert("Something went wrong adding the user to the Database.")
          //console.log(error)
        })      
      } else {
        console.log("Unexpected situation encountered.")
      }
    }
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleDelete = (id, name) => () => {
    if (window.confirm(`Are you sure you want to delete ${name} from the Phonebook?`)) {
      jsonDB.deletePerson(id)
      .then(status => {
        if (status === 200) {
          console.log(`deleted ${name} successfully`)
        }
        setPersons(persons.filter(person => {
          return person.id !== id
        }))
      })
    }
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
        <DisplayNames
          persons={filterApply ? showFiltered() : persons}
          operationFunctions= { { handleDelete } }
        />
    </div>
  )
}

export default App