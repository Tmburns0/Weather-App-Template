import React, { useState, useEffect } from "react";
import "./App.css";
import { getWeather } from "./services/WeatherService";
import weatherIcon from "../readme_assets/weather-icons.jpg";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getWeather(city);
        setWeather({
          name: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (event) => {
    event.preventDefault();
    const newCity = event.target.elements["search-city"].value.trim();
    if (newCity) setCity(newCity);
  };

  return (
    <main className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>Path2Tech Weather App</h1>
        <p>Get the latest weather updates for your city</p>
      </header>

      {/* Weather Icon */}
      <section className="weather-picture">
        <img src={weatherIcon} alt="Weather Icon" className="weather-image" />
        <p>Find Weather of a City</p>
      </section>

      {/* Search Section */}
      <section className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search-city"
            id="search-city"
            placeholder="Search for a city"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </section>

      {/* Weather Details */}
      {loading && <p>Loading weather data...</p>}
      {error && <p className="error-message">{error}</p>}
      {weather ? (
        <section className="weather-details">
          <h2>
            Weather in {weather.name}, {weather.country}
          </h2>
          <img src={weather.icon} alt={weather.description} />
          <p>Temperature: {weather.temp}°F</p>
          <p>Condition: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} mph</p>
        </section>
      ) : (
        !loading && !error && (
          <p>No weather data available. Try searching for a city.</p>
        )
      )}
    </main>
  );
}

export default App;
