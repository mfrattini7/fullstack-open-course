import { useState, useEffect } from "react"

import getWeather from "../services/weather"

const Weather = ({ name, lat, lon }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getWeather(lat, lon).then((weather) => {
      setWeather(weather)
    });
  }, [lat, lon])

  if (!weather) return <p>There was a problem with weather data</p>


  return <>
      <h2>Weather in {name}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
      <p>wind {weather.wind.speed} m/s</p>
    </>
}

export default Weather
