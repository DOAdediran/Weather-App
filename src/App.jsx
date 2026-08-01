import { useEffect, useState } from 'react'

const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('Enter a city name and press Search.')
  const [history, setHistory] = useState([])
  const [theme, setTheme] = useState('dark')
  const [locationFilter, setLocationFilter] = useState('')

  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherAppHistory')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch {
        localStorage.removeItem('weatherAppHistory')
      }
    }

    const savedTheme = localStorage.getItem('weatherAppTheme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('weatherAppHistory', JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem('weatherAppTheme', theme)
    document.documentElement.classList.toggle('light', theme === 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const themeStyles = {
    root: theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-950',
    panel: theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200',
    section: theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/90 border-slate-200',
    card: theme === 'dark' ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/90 border-slate-200',
    input: theme === 'dark'
      ? 'border-slate-700 bg-slate-950 text-slate-100 focus:border-cyan-400 focus:ring-cyan-500/40'
      : 'border-slate-300 bg-white text-slate-950 focus:border-sky-400 focus:ring-sky-500/40',
    primaryButton: theme === 'dark'
      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
      : 'bg-sky-600 text-white hover:bg-sky-500',
    secondaryButton: theme === 'dark'
      ? 'bg-slate-800 text-slate-100 hover:bg-slate-700'
      : 'bg-slate-200 text-slate-950 hover:bg-slate-300',
    quickButton: theme === 'dark'
      ? 'rounded-full border border-slate-700 bg-slate-950 text-slate-100 hover:border-cyan-400 hover:text-cyan-200'
      : 'rounded-full border border-slate-300 bg-white text-slate-950 hover:border-sky-400 hover:text-sky-700',
    historyButton: theme === 'dark'
      ? 'rounded-full border border-slate-700 bg-slate-950 text-slate-100 hover:border-cyan-400 hover:text-cyan-200'
      : 'rounded-full border border-slate-300 bg-white text-slate-950 hover:border-sky-400 hover:text-slate-950',
    mutedText: theme === 'dark' ? 'text-slate-400' : 'text-slate-600',
    titleText: theme === 'dark' ? 'text-white' : 'text-slate-950',
    accentText: theme === 'dark' ? 'text-cyan-300/90' : 'text-sky-600/90',
    sectionCard: theme === 'dark' ? 'rounded-3xl border border-slate-800 bg-slate-950/90' : 'rounded-3xl border border-slate-200 bg-slate-50/90',
    forecastCard: theme === 'dark' ? 'rounded-3xl border border-slate-800 bg-slate-900/90' : 'rounded-3xl border border-slate-200 bg-white/90',
    statusButton: theme === 'dark' ? 'mt-4 inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700' : 'mt-4 inline-flex rounded-full bg-slate-200 px-4 py-2 text-sm text-slate-950 transition hover:bg-slate-300',
  }

  const nigerianLocations = [
    { state: 'Abia', cities: ['Umuahia', 'Aba', 'Ohafia', 'Arochukwu', 'Isuikwuato', 'Obingwa'] },
    { state: 'Adamawa', cities: ['Yola', 'Mubi', 'Numan', 'Jimeta', 'Hong', 'Ganye'] },
    { state: 'Akwa Ibom', cities: ['Uyo', 'Eket', 'Ikot Ekpene', 'Oron', 'Etinan', 'Abak'] },
    { state: 'Anambra', cities: ['Awka', 'Onitsha', 'Nnewi', 'Otuocha', 'Ekwulobia', 'Agulu'] },
    { state: 'Bauchi', cities: ['Bauchi', 'Azare', 'Misau', 'Ningi', 'Alkaleri', 'Katagum'] },
    { state: 'Bayelsa', cities: ['Yenagoa', 'Ogbia', 'Brass', 'Sagbama', 'Ekeremor', 'Nembe'] },
    { state: 'Benue', cities: ['Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala', 'Vandeikya', 'Adikpo'] },
    { state: 'Borno', cities: ['Maiduguri', 'Biu', 'Dikwa', 'Gwoza', 'Kukawa', 'Ngala'] },
    { state: 'Cross River', cities: ['Calabar', 'Ugep', 'Ogoja', 'Ikom', 'Obudu', 'Akamkpa'] },
    { state: 'Delta', cities: ['Asaba', 'Warri', 'Ughelli', 'Sapele', 'Abraka', 'Burutu'] },
    { state: 'Ebonyi', cities: ['Abakaliki', 'Afikpo', 'Onueke', 'Ezza', 'Ikwo', 'Ohaozara'] },
    { state: 'Edo', cities: ['Benin City', 'Auchi', 'Ekpoma', 'Uromi', 'Igarra', 'Agbor'] },
    { state: 'Ekiti', cities: ['Ado-Ekiti', 'Oye-Ekiti', 'Ikole-Ekiti', 'Ikere', 'Ilawe', 'Irepodun/Ifelodun', 'Efon-Alaaye', 'Aramoko-Ekiti'] },
    { state: 'Enugu', cities: ['Enugu', 'Nsukka', 'Agbani', 'Udi', 'Obolo-Afor', 'Awgu'] },
    { state: 'FCT', cities: ['Abuja', 'Gwagwalada', 'Kuje', 'Bwari', 'Kwali', 'Zuba'] },
    { state: 'Gombe', cities: ['Gombe', 'Kaltungo', 'Billiri', 'Dukku', 'Funakaye', 'Yamaltu Deba'] },
    { state: 'Imo', cities: ['Owerri', 'Orlu', 'Okigwe', 'Mbaise', 'Aboh Mbaise', 'Oguta'] },
    { state: 'Jigawa', cities: ['Dutse', 'Hadejia', 'Kazaure', 'Gumel', 'Birnin Kudu', 'Ringim'] },
    { state: 'Kaduna', cities: ['Kaduna', 'Zaria', 'Kafanchan', 'Kachia', 'Soba', 'Lere'] },
    { state: 'Kano', cities: ['Kano', 'Katsina', 'Wudil', 'Rano', 'Gaya', 'Bichi'] },
    { state: 'Katsina', cities: ['Katsina', 'Daura', 'Funtua', 'Kankia', 'Jibia', 'Dutsin-Ma'] },
    { state: 'Kebbi', cities: ['Birnin Kebbi', 'Argungu', 'Yauri', 'Zuru', 'Bagudo', 'Jega'] },
    { state: 'Kogi', cities: ['Lokoja', 'Idah', 'Anyigba', 'Okene', 'Kabba', 'Ajaokuta'] },
    { state: 'Kwara', cities: ['Ilorin', 'Offa', 'Kaiama', 'Jebba', 'Ilesha Baruba', 'Omu-Aran'] },
    { state: 'Lagos', cities: ['Lagos', 'Ikeja', 'Surulere', 'Lekki', 'Victoria Island', 'Alimosho'] },
    { state: 'Nasarawa', cities: ['Lafia', 'Keffi', 'Akwanga', 'Karu', 'Wamba', 'Nasarawa Eggon'] },
    { state: 'Niger', cities: ['Minna', 'Kontagora', 'Suleja', 'Bida', 'Paikoro', 'Lapai'] },
    { state: 'Ogun', cities: ['Abeokuta', 'Sagamu', 'Ijebu Ode', 'Ota', 'Shagamu', 'Ifo'] },
    { state: 'Ondo', cities: ['Akure', 'Ondo', 'Owo', 'Ikare', 'Iju', 'Igbokoda'] },
    { state: 'Osun', cities: ['Osogbo', 'Ilesa', 'Ede', 'Ikirun', 'Iwo', 'Ifetedo'] },
    { state: 'Oyo', cities: ['Ibadan', 'Ogbomosho', 'Saki', 'Iseyin', 'Oyo Town', 'Kisi'] },
    { state: 'Plateau', cities: ['Jos', 'Bukuru', 'Pankshin', 'Shendam', 'Mangu', 'Langtang'] },
    { state: 'Rivers', cities: ['Port Harcourt', 'Bonny', 'Eleme', 'Obio/Akpor', 'Ahoada', 'Degema'] },
    { state: 'Sokoto', cities: ['Sokoto', 'Tambuwal', 'Gwadabawa', 'Wurno', 'Kebbe', 'Tureta'] },
    { state: 'Taraba', cities: ['Jalingo', 'Wukari', 'Sardauna', 'Bali', 'Ibi', 'Gashaka'] },
    { state: 'Yobe', cities: ['Damaturu', 'Potiskum', 'Gujba', 'Nguru', 'Bursari', 'Fika'] },
    { state: 'Zamfara', cities: ['Gusau', 'Talata Mafara', 'Kaura Namoda', 'Maru', 'Bakura', 'Anka'] },
  ]

  const flattenedNigerianLocations = nigerianLocations.flatMap((location) =>
    location.cities.map((cityName) => ({
      city: cityName,
      state: location.state,
    }))
  )

  const filteredNigerianLocations = locationFilter.trim()
    ? flattenedNigerianLocations.filter(({ city, state }) => `${city} ${state}`.toLowerCase().includes(locationFilter.toLowerCase()))
    : flattenedNigerianLocations.slice(0, 18)

  const addToHistory = (entry) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.city !== entry.city)
      return [entry, ...filtered].slice(0, 6)
    })
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleQuickCity = (cityName) => {
    setCity(cityName)
    searchCity(cityName)
  }

  const searchCity = async (cityName) => {
    if (!cityName.trim()) {
      setStatus('error')
      setMessage('Please type a city name before searching.')
      setWeather(null)
      return
    }

    setStatus('loading')
    setMessage(`Looking up city coordinates for ${cityName}...`)
    setWeather(null)

    try {
      const geoResponse = await fetch(`${GEO_API}?name=${encodeURIComponent(cityName)}&count=5&language=en&format=json`)
      if (!geoResponse.ok) {
        throw new Error(`Geocoding request failed (${geoResponse.status})`)
      }

      const geoData = await geoResponse.json()
      const matchedResults = Array.isArray(geoData?.results) ? geoData.results : []
      const nigeriaMatch = matchedResults.find((result) => result.country === 'Nigeria')
      const location = nigeriaMatch || matchedResults[0]

      if (!location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
        setStatus('error')
        setMessage(`No match found for "${cityName}". Try another city name.`)
        return
      }

      setMessage('Fetching current weather...')
      const weatherResponse = await fetch(
        `${WEATHER_API}?latitude=${location.latitude}&longitude=${location.longitude}&timezone=auto&current_weather=true&hourly=temperature_2m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min`
      )
      if (!weatherResponse.ok) {
        throw new Error(`Weather request failed (${weatherResponse.status})`)
      }

      const weatherData = await weatherResponse.json()
      const current = weatherData?.current_weather
      const daily = weatherData?.daily
      const hourly = weatherData?.hourly
      if (!current || typeof current.temperature !== 'number' || !daily?.time?.length || !hourly?.time?.length || !hourly?.relativehumidity_2m?.length) {
        throw new Error('Unexpected weather data format')
      }

      const weatherPayload = {
        city: location.name,
        country: location.country,
        temperature: current.temperature,
        windspeed: current.windspeed,
        weathercode: current.weathercode,
        time: current.time,
        timezone: weatherData.timezone,
        hourly: {
          time: hourly.time,
          temperature: hourly.temperature_2m,
          humidity: hourly.relativehumidity_2m,
        },
        daily: {
          time: daily.time,
          weathercode: daily.weathercode,
          temperatureMax: daily.temperature_2m_max,
          temperatureMin: daily.temperature_2m_min,
        },
      }

      setWeather(weatherPayload)
      addToHistory({ city: location.name, country: location.country })
      setStatus('success')
      setMessage('Weather loaded successfully.')
    } catch (error) {
      console.error(error)
      setStatus('error')
      if (error instanceof TypeError) {
        setMessage('Network problem detected. Check your connection and try again.')
      } else {
        setMessage(error.message || 'Unable to load weather information.')
      }
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    searchCity(city)
  }

  const getWeatherDescription = (code) => {
    const mapping = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with heavy hail',
    }
    return mapping[code] || 'Weather details unavailable'
  }

  const getWeatherIcon = (code) => {
    const icons = {
      0: '☀️',
      1: '🌤️',
      2: '⛅',
      3: '☁️',
      45: '🌫️',
      48: '🌁',
      51: '🌦️',
      53: '🌦️',
      55: '🌧️',
      56: '🌧️',
      57: '🌧️',
      61: '🌧️',
      63: '🌧️',
      65: '⛈️',
      66: '🌧️',
      67: '⛈️',
      71: '🌨️',
      73: '🌨️',
      75: '❄️',
      80: '🌦️',
      81: '🌧️',
      82: '⛈️',
      95: '⛈️',
      96: '⛈️',
      99: '⛈️',
    }
    return icons[code] || 'ℹ️'
  }

  const getHourlyChartData = (hourly, field = 'temperature') => {
    const values = hourly[field].slice(0, 12)
    const labels = hourly.time.slice(0, 12).map((time) =>
      new Date(time).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    )
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1
    return { labels, values, min, max, range }
  }

  const hourlyTempData = weather?.hourly ? getHourlyChartData(weather.hourly, 'temperature') : null
  const hourlyHumidityData = weather?.hourly ? getHourlyChartData(weather.hourly, 'humidity') : null

  return (
    <div className={`min-h-screen px-4 py-8 sm:px-6 lg:px-8 ${themeStyles.root}`}>
      <div className={`mx-auto max-w-3xl rounded-3xl border p-8 shadow-2xl shadow-slate-950/40 backdrop-blur ${themeStyles.panel}`}>
        <header className="mb-8 space-y-3 text-center">
          <p className={`text-sm uppercase tracking-[0.4em] ${themeStyles.accentText}`}>Realtime API Integration</p>
          <h1 className={`text-3xl font-semibold sm:text-4xl ${themeStyles.titleText}`}>Weather Dashboard</h1>
          <p className={`mx-auto max-w-2xl ${themeStyles.mutedText}`}>
            Search by city to fetch live weather, see system status, and recover from bad input or network issues.
          </p>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form className="flex-1" onSubmit={handleSearch}>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="city-input">City</label>
              <input
                id="city-input"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Enter state, city, or local government area (for example: Lagos, Abuja, Enugu, Aba)"
                className={`w-full rounded-2xl border px-4 py-3 outline-none ring-1 transition ${themeStyles.input}`}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`rounded-2xl px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${themeStyles.primaryButton}`}
              >
                {status === 'loading' ? 'Searching…' : 'Search'}
              </button>
            </div>
          </form>
          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${themeStyles.secondaryButton}`}
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>

        <section className={`mt-6 rounded-3xl border p-6 ${themeStyles.section}`}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className={`text-sm font-semibold uppercase tracking-[0.3em] ${themeStyles.accentText}`}>Nigeria-wide locations</h2>
          </div>

          <div className="mb-4">
            <label className={`mb-2 block text-xs font-semibold uppercase tracking-[0.25em] ${themeStyles.mutedText}`} htmlFor="location-filter">
              Search Nigeria places
            </label>
            <input
              id="location-filter"
              type="text"
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
              placeholder="Type a state or city"
              className={`w-full rounded-2xl border px-4 py-3 outline-none ring-1 transition ${themeStyles.input}`}
            />
          </div>

          <div className="flex max-h-64 flex-wrap gap-2 overflow-y-auto pr-1">
            {filteredNigerianLocations.length > 0 ? (
              filteredNigerianLocations.map(({ city, state }) => (
                <button
                  key={`${state}-${city}`}
                  type="button"
                  onClick={() => handleQuickCity(city)}
                  className={themeStyles.quickButton}
                >
                  {city} • {state}
                </button>
              ))
            ) : (
              <p className={themeStyles.mutedText}>No matching Nigerian locations found.</p>
            )}
          </div>
        </section>

        <section className={`mt-6 rounded-3xl border p-6 ${themeStyles.section}`}>
          <div className={`mb-4 flex items-center justify-between gap-4 text-sm ${themeStyles.mutedText}`}>
            <span>Status:</span>
            <span className={status === 'error' ? 'text-rose-300' : status === 'success' ? 'text-emerald-300' : themeStyles.mutedText}>
              {status === 'loading' ? 'Loading…' : status === 'success' ? 'Success' : status === 'error' ? 'Error' : 'Idle'}
            </span>
          </div>
          <p className={`min-h-[3rem] ${themeStyles.mutedText}`}>{message}</p>
          {status === 'error' && (
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className={themeStyles.statusButton}
            >
              Clear status
            </button>
          )}
        </section>

        {history.length > 0 && (
          <section className={`mt-6 rounded-3xl border p-6 ${themeStyles.panel}`}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className={`text-sm font-semibold uppercase tracking-[0.3em] ${themeStyles.accentText}`}>Recent searches</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {history.map((item) => (
                <button
                  key={`${item.city}-${item.country}`}
                  type="button"
                  onClick={() => {
                    setCity(item.city)
                    searchCity(item.city)
                  }}
                  className={themeStyles.historyButton}
                >
                  {item.city}, {item.country}
                </button>
              ))}
            </div>
          </section>
        )}

        {weather && (
          <article className={`mt-6 rounded-3xl border p-6 shadow-xl shadow-slate-950/20 ${themeStyles.panel}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">Current weather</p>
                <h2 className={`mt-2 text-3xl font-semibold ${themeStyles.titleText}`}>{weather.city}, {weather.country}</h2>
                <p className={`mt-1 ${themeStyles.mutedText}`}>As of {new Date(weather.time).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
              </div>
              <div className={`rounded-3xl px-5 py-4 text-center ring-1 sm:px-6 ${themeStyles.sectionCard}`}>
                <p className={`text-5xl font-semibold ${themeStyles.titleText}`}>{weather.temperature.toFixed(1)}°C</p>
                <p className={`mt-1 text-sm ${themeStyles.mutedText}`}>{getWeatherIcon(weather.weathercode)} {getWeatherDescription(weather.weathercode)}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className={`${themeStyles.sectionCard} p-4`}>
                <p className={`text-sm uppercase tracking-[0.3em] ${themeStyles.mutedText}`}>Wind speed</p>
                <p className={`mt-2 text-xl font-semibold ${themeStyles.titleText}`}>{weather.windspeed} km/h</p>
              </div>
              <div className={`${themeStyles.sectionCard} p-4`}>
                <p className={`text-sm uppercase tracking-[0.3em] ${themeStyles.mutedText}`}>City</p>
                <p className={`mt-2 text-xl font-semibold ${themeStyles.titleText}`}>{weather.city}</p>
              </div>
            </div>

            {weather?.hourly && (
              <>
                <section className={`mt-6 rounded-3xl border p-6 ${themeStyles.section}`}>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className={`text-sm font-semibold uppercase tracking-[0.3em] ${themeStyles.accentText}`}>Next 12 hours</h2>
                    <p className={`text-sm ${themeStyles.mutedText}`}>Temperature forecast</p>
                  </div>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex items-end gap-3 min-w-[24rem]">
                      {hourlyTempData?.values.map((value, index) => {
                        const height = ((value - hourlyTempData.min) / hourlyTempData.range) * 100 + 20
                        return (
                          <div key={hourlyTempData.labels[index]} className="flex-1 text-center">
                            <div
                              className={`mx-auto mb-3 h-28 w-full rounded-t-3xl ${theme === 'dark' ? 'bg-cyan-500' : 'bg-sky-600'}`}
                              style={{ height: `${height}%` }}
                            />
                            <p className={`text-xs ${themeStyles.mutedText}`}>{hourlyTempData.labels[index]}</p>
                            <p className={`text-sm font-semibold ${themeStyles.titleText}`}>{value.toFixed(0)}°</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </section>

                {hourlyHumidityData && (
                  <section className={`mt-6 rounded-3xl border p-6 ${themeStyles.section}`}>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h2 className={`text-sm font-semibold uppercase tracking-[0.3em] ${themeStyles.accentText}`}>Humidity</h2>
                      <p className={`text-sm ${themeStyles.mutedText}`}>Next 12 hours</p>
                    </div>
                    <div className="overflow-x-auto pb-2">
                      <div className="flex items-end gap-3 min-w-[24rem]">
                        {hourlyHumidityData.values.map((value, index) => {
                          const height = ((value - hourlyHumidityData.min) / hourlyHumidityData.range) * 100 + 20
                          return (
                            <div key={hourlyHumidityData.labels[index]} className="flex-1 text-center">
                              <div
                                className={`mx-auto mb-3 h-28 w-full rounded-t-3xl ${theme === 'dark' ? 'bg-sky-500' : 'bg-cyan-500'}`}
                                style={{ height: `${height}%` }}
                              />
                              <p className={`text-xs ${themeStyles.mutedText}`}>{hourlyHumidityData.labels[index]}</p>
                              <p className={`text-sm font-semibold ${themeStyles.titleText}`}>{value.toFixed(0)}%</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}
          </article>
        )}

        {weather?.daily && (
          <section className={`mt-6 rounded-3xl border p-6 ${themeStyles.section}`}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className={`text-sm font-semibold uppercase tracking-[0.3em] ${themeStyles.accentText}`}>5-day outlook</h2>
              <p className={`text-sm ${themeStyles.mutedText}`}>{weather.timezone}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {weather.daily.time.slice(0, 5).map((date, index) => (
                <div key={date} className={`${themeStyles.forecastCard} p-4`}>
                  <p className={`text-sm ${themeStyles.mutedText}`}>{new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  <p className={`mt-3 text-sm font-semibold ${themeStyles.titleText}`}>{getWeatherIcon(weather.daily.weathercode[index])} {getWeatherDescription(weather.daily.weathercode[index])}</p>
                  <p className={`mt-4 text-lg font-semibold ${themeStyles.titleText}`}>{weather.daily.temperatureMin[index].toFixed(1)}° / {weather.daily.temperatureMax[index].toFixed(1)}°</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default App
