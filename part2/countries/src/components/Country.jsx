const Country = ({ country }) => {

    console.log("Country in component", country)
    /*
    const languages = country.languages.map(language => {
        return (
            <li key={language}>
                {language}
            </li>
        )
    })
    */
    if(country === null) {
        return <div>Nothing</div>
    }

    return (
        <div>
            <h1>{country.name.common}</h1><h3>{country.name.official}</h3><br />
            <h4>Population: {country.population}</h4>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td>Continent</td>
                        <td>{country.continent}</td>
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
                
            </ul>
            <h3>Flag</h3>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h3>Coat of arms</h3>
            <img src={country.coatOfArms.png} />
        </div>
    )
}

export default Country