import "../index.css"

const WeatherDayDisplay = ({ day }) => {
    if (day === null) {
        return null
    }
    return (
        <tr>
            <td>{day.summary}</td>
            <td>{day.temp.day}</td>
            <td>{day.temp.eve}</td>
            <td>{day.temp.max}</td>
            <td>{day.temp.min}</td>
            <td>{day.humidity}</td>
            <td>{day.weather[0].main}</td>
            <td><img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}/></td>
        </tr>
    )
}

const WeatherDailyDisplay = ({ dailyArray }) => {
    const weatherDailyComps = dailyArray.map(day => {
        return <WeatherDayDisplay day={day} />
    })
    
    return (
        <table>
            <thead>
                <tr>
                    <td>Summary</td>
                    <td>Day</td>
                    <td>Evening</td>
                    <td>Max</td>
                    <td>Min</td>
                    <td>Humidity</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {weatherDailyComps}
            </tbody>
        </table>
    )
}

const WeatherDisplay = ({ country, countryWeather }) => {
    if (countryWeather === null) {
        return null
    }
    return (
        <>
        <div>
            
        </div>
        <div>
            <div class="d-flex">
                <h1>Today's Forecast</h1><h3>Timezone: <i>{countryWeather.timezone}</i></h3>
            </div>
            <div class="d-flex">
                <img src={`https://openweathermap.org/img/wn/${countryWeather.current.weather[0].icon}.png`}/>
                <h3>{countryWeather.current.weather[0].description}</h3>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>Temperature:</td>
                        <td>{countryWeather.current.temp}</td>
                        <td>Clouds:</td>
                        <td>{countryWeather.current.clouds}</td>
                        <td>Humidity</td>
                        <td>{countryWeather.current.humidity}</td>
                    </tr>
                </tbody>
            </table>
            <h1>Daily forecasts...</h1>
            <WeatherDailyDisplay
                dailyArray={countryWeather.daily}
            />
        </div>
        </>
    )
}

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

const Country = ({ country, countryWeather }) => {
    if(country === null) {
        return <div>Nothing</div>
    }

    console.log("countryWeather", countryWeather)

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
            <h3>Weather Report</h3>
            <hr />
            <WeatherDisplay
                country={country}
                countryWeather={countryWeather}
            />
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