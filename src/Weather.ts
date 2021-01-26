import { config } from "./config"

type WeatherInput = {
  city: string
}
export type WeatherOutput = {
  temperature: number
}

async function fetchWeatherByCity(input: WeatherInput): Promise<Array<WeatherOutput>> {
  const fiveDayForecastApi = "https://api.openweathermap.org/data/2.5/forecast"
  const params = new URLSearchParams({
    q: input.city,
    appid: config.apiKey,
    units: "metric"
  })
  const response = await fetch(`${fiveDayForecastApi}?${params.toString()}`)

  if (!response.ok) {
    throw Error(`Weather could not be fetched: ${await response.text()}`)
  }

  const body = await response.json() as DailyForecastApiResponse

  return body.list.map(it => ({ temperature: it.main.temp }))
}

// this interface is a subset of the network response expected from openweathermap daily forecast
interface DailyForecastApiResponse {
  list: Array<{
    dt: number, // timestamp for start of day
    main: {
      temp: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      sea_level: number,
      grnd_level: number,
      humidity: number,
      temp_kf: number
    },
    pressure: number,
    humidity: number,
    weather: Array<{
      id: number,
      main: string,
      description: string,
    }>,
    speed: number,
    deg: number,
    clouds: number,
    rain: number,
    snow: number
  }>

}

export { fetchWeatherByCity }

