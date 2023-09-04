import Country from "./Country"

const CountryListDisplay = ({countries, countryOperations}) => {
    const countriesDisplay = countries.map(country => {
        return (
        <tr key={country.name.common}>
            <td><b>{country.name.common}</b> (<i>{country.name.official}</i>)</td>
            <td><button
                onClick={countryOperations.handleCountrySelect(country.name.official)}>
                    show 
                </button>
            </td>
        </tr>
        )
    })
    return (
        <table>
            <tbody>
                {countriesDisplay}
            </tbody>
        </table>
    )
}

const Countries = ({ countries, currentCountryData, countryOperations }) => {
    if (countries === null) {
        return <div>Go ahead, search for a country!</div>
    }
    const lngth = countries.length
    if(currentCountryData.currentCountry !== null) {
        return (
            <>
            <Country
                country={currentCountryData.currentCountry}
                countryWeather={currentCountryData.currentCountryWeather}
            />
            </>
        )
    }
    if (lngth > 10){
        return (
            <div>
                Too many matches, narrow down your search.
            </div>
        )
    } else if (lngth > 1) {
        return <CountryListDisplay
            countries={countries}
            countryOperations={countryOperations}
        />
    } else {
        return (
            <div>
                No matches found.
            </div>
        )
    }
}

export default Countries