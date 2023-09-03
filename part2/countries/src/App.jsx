import { useState, useEffect } from 'react'
import Countries from "./components/Countries"
import countriesAPI from "./services/countriesAPI"

function App() {
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState(null)
  const [currentCountry, setCurrentCountry] = useState({})

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const getCountryDetailsFn = () => {
    const countryDetailed = countriesAPI.get(countries[0].name.common)
     //HOW DO WE MODIFY STATE HERE.
      //State logic must be kept within App, right?
      //While we DO get the data here, maybe we're supposed to keep this function elsewhere.
      //Somehow, we must BOTH return the country thing
      //If currentCountry is an object, we can keep it within App.jsx
      //And if countries.length === 0 then we know we can access it freely.
      //Thus, it's possible.
    return countryDetailed
  }

  const getCountriesFiltered = () => {
    countriesAPI.getAll()
    .then(countriesAll => {
      //console.log(countriesAll[0])
      let countriesFiltered = 
        countriesAll.filter(countryObj => {
          return (countryObj.name.common.toLowerCase().includes(country.toLowerCase())
            || countryObj.name.official.toLowerCase().includes(country.toLowerCase()))
        })
      //console.log(countriesFiltered)
      setCountries(countriesFiltered)
      return countriesFiltered
    })
    .then(countriesFiltered => {
      if (countriesFiltered.length === 1)
        return countriesAPI.get(countriesFiltered[0].name.common)
      else {
        return null
      }
    })
    .then(countryRetrieved => {
      countryRetrieved === null ? setCurrentCountry({}) : setCurrentCountry(countryRetrieved)
    })
  }

  useEffect(getCountriesFiltered, [country])

  return (
    <>
      <div>
        <h1>Country finder</h1>
        <input 
          value={country}
          onChange={handleCountryChange}
        />
      </div>
      <div>
        <Countries 
          countries={countries} 
          currentCountry={currentCountry}
        />
      </div>
    </>
  )
}

export default App
