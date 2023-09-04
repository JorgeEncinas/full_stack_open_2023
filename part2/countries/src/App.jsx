import { useState, useEffect } from 'react'
import Countries from "./components/Countries"
import countriesAPI from "./services/countriesAPI"

function App() {
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState(null)
  const [currentCountry, setCurrentCountry] = useState(null)

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const getCountriesFiltered = () => {
    if (country.length < 1) {
      return undefined
    }
    countriesAPI.getAll()
    .then(countriesAll => {
      let countriesFiltered = 
        countriesAll.filter(countryObj => {
          return (countryObj.name.common.toLowerCase().includes(country.toLowerCase())
            || countryObj.name.official.toLowerCase().includes(country.toLowerCase()))
        })
      setCountries(countriesFiltered)
      return countriesFiltered
    })
    .then(countriesFiltered => {
      if (countriesFiltered.length === 1) {
        return countriesAPI.get(countriesFiltered[0].name.common)
      }
      else {
        return null
      }
    })
    .then(countryRetrieved => {
      countryRetrieved === null ? setCurrentCountry(null) : setCurrentCountry(countryRetrieved)
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
