import "../index.css"

const Languages = ({ country }) => {
    const languages = Object.values(country.languages).map(language => {
        return (
            <li key={language}>
                {language}
            </li>
        )
    })
    return languages
}

const Continents = ({ continents }) => {
    const continentsString = continents.reduce((contString, continent) => {
        return contString + continent + " "
    }, "")
    return continentsString
}

const Country = ({ country }) => {
    if(country === null) {
        return <div>Nothing</div>
    }

    return (
        <div>
            <div className={"country-name"}>
                <h1>{country.name.common}</h1>
                <h3><i>({country.name.official})</i></h3>
            </div>
            <h4>Population: {country.population}</h4>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td>Continent(s)</td>
                        <td><Continents continents={country.continents} /></td>
                    </tr>
                    <tr>
                        <td>Region</td>
                        <td>{country.region}</td>
                    </tr>
                    <tr>
                        <td>Subregion</td>
                        <td>{country.subregion}</td>
                    </tr>
                    <tr>
                        <td>Capital</td>
                        <td>{country.capital}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Languages:</h3>
            <ul>
                <Languages country={country} />
            </ul>
            <h3>Flag</h3>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h3>Coat of arms</h3>
            <img src={country.coatOfArms.png} />
        </div>
    )
}

export default Country