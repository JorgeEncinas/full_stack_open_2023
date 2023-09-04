import axios from 'axios'
const apikey = import.meta.env.VITE_WEATHER_KEY
const baseUrl= "https://api.openweathermap.org/data/3.0/onecall?"

const get = (country) => {
    if (country === undefined) {
        return {}
    }
    let lat = country.latlng[0];
    let lon = country.latlng[1];
    let exclude = "minutely,hourly";
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apikey}`)
    return request.then(response => response.data)
}

export default { get }