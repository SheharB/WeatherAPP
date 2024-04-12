import React from 'react';


function WeatherDisplay({ weatherData, unit, onToggleUnit }) {
    const { main, weather, wind, name } = weatherData;
    let temperature = main.temp;
    
    if (unit === 'Fahrenheit') {
      temperature = temperature * 9/5 + 32;
    }

    return (
      <div className="weather-display">
        <h2>Weather in {name}</h2>
        <img src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="Weather icon" />
        <p className="temperature">Temperature: {temperature.toFixed(2)}°{unit}</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind Speed: {wind.speed} m/s</p>
        <button className="toggle-unit" onClick={onToggleUnit}>Toggle Unit</button>
      </div>
    );
  }
  
export default WeatherDisplay;
