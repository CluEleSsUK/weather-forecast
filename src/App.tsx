import React, { useEffect, useState } from "react"
import { fetchWeatherByCity, WeatherOutput } from "./Weather"
import "./App.css"

function App() {
  const city = "London"
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [weather, setWeather] = useState<Array<WeatherOutput>>()
  const [errorMessage, setErrorMessage] = useState<string>()

  const onWeatherLoaded = (weather: Array<WeatherOutput>) => {
    setLoading(false)
    setWeather(weather)
  }

  const onWeatherLoadError = (err: Error) => {
    setLoading(false)
    setError(true)
    setErrorMessage(err.message)
  }

  useEffect(() => {
    setLoading(true)
    fetchWeatherByCity({ city })
      .then(onWeatherLoaded)
      .catch(onWeatherLoadError)
  }, [city])

  if (isError) {
    return <p>It broke! {errorMessage}</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!weather || weather.length === 0) {
    return <p>Weather couldn't be found somehow</p>
  }

  return (
    <div className="App">
      temperature today in {city} is {weather[0].temperature} degrees celsius
    </div>
  )
}

export default App
