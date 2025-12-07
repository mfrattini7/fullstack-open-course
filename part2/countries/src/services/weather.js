import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
    throw Error("Missing openweathermap api key.")
}

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (lat, lon) => {
    const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    return axios.get(url).then((response) => response.data)
};

export default getWeather;