import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  let [temperature, setTemperature] = useState(null);
  const [message, setMessage] = useState("");
  function showTemperature(response) {
    setTemperature(response.data.main.temp);
  }

  function fahrenheitTemperature() {
    let temperature = (weather.temperature * 9) / 5 + 32;
    return Math.round(temperature);
  }

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      city: response.data.main.city,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "002c6c2205afdd4fb34a1392f8b68aca";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    setMessage(city);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div className="Detail">
        {form}
        <h2>{message}</h2>
        <h2>{weather.city}</h2>
        <ul>
          <li>
            Temperature: {Math.round(weather.temperature)}
            <a href=" ">°C</a> | {fahrenheitTemperature()}
            <a href=" ">°F</a>
          </li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
