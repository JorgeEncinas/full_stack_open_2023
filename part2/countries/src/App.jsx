import { useState, useEffect } from 'react'
import Countries from "./components/Countries"
import countriesAPI from "./services/countriesAPI"
import weatherAPI from "./services/weatherAPI"

function App() {
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState(null)
  const [currentCountry, setCurrentCountry] = useState(null)
  const [currentCountryWeather, setCurrentCountryWeather] = useState(null)

  const handleCountryChange = (event) => {
    setCurrentCountry(null)
    setCurrentCountryWeather(null)
    setCountry(event.target.value)
  }

  const handleCountrySelect = (countryOfficialName) => () => {
    countriesAPI.get(countryOfficialName)
      .then(countryRetrieved => {
        if (countryRetrieved !== null) {
          setCurrentCountry(countryRetrieved)
        } 
      })
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

  const getCountryWeather = () => {
    if(currentCountry === null) {
      return undefined
    }
    weatherAPI.get(currentCountry)
      .then(countryWeather => {
        if (countryWeather !== null) {
          setCurrentCountryWeather(countryWeather)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(getCountriesFiltered, [country])
  useEffect(getCountryWeather, [currentCountry])

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
          currentCountryData = { { currentCountry, currentCountryWeather } }
          countryOperations={ {handleCountrySelect} }
        />
      </div>
    </>
  )
}

export default App
