import Country from "./Country"

const Countries = ({ countries, currentCountry }) => {
    if (countries === null) {
        return <div>Go ahead, search for a country!</div>
    }
    console.log("currentCountry", currentCountry)
    const lngth = countries.length

    if (lngth > 10){
        return (
            <div>
                Too many matches, narrow down your search.
            </div>
        )
    } else if (lngth > 1) {
        //console.log(countries)
        const countriesDisplay = countries.map(country => {
            return (
            <tr key={country.name.common}>
                <td >{country.name.common}</td>
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
    } else if(lngth === 1) {
        return (
            <>
            <Country country={currentCountry} />
            </>
        )
    } else {
        return (
            <div>
                No matches found.
            </div>
        )
    }
}

export default Countries