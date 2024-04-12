# WeatherAPP

///////////App.js//////////////////////

import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import WeatherDisplay from './WeatherDisplay';
import './App.css';

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('Celsius');

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const fetchWeatherData = async (location) => {
    try {
      const apiKey = "c4be6804058ca5d52c5146290085c27a";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setWeatherData(null); 
    }
  };

  const handleSearch = (location) => {
    setLocation(location);
  };

  const toggleUnit = () => {
    setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {weatherData && (
        <WeatherDisplay
          weatherData={weatherData}
          unit={unit}
          onToggleUnit={toggleUnit}
        />
      )}
    </div>
  );
}

export default WeatherApp;


/////////////////////////////////////////////////* App.css *///////////////////////////////////////


body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 20px;
}

form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  width: 300px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #004494;
}

div.weather-display {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-image: linear-gradient(to bottom, #79c7e3, #2b86c5);
  color: #fff; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: fit-content;
  margin: 20px auto;
  position: relative; 
  overflow: hidden;
}

h2 {
  color: #333;
}

p {
  font-size: 18px;
  line-height: 1.6;
}

p.temperature {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

button.toggle-unit {
  background-color: #f0f0f0;
  color: #333;
  margin-top: 20px;
}

button.toggle-unit:hover {
  background-color: #e0e0e0;
}

.weather-display img {
  max-width: 100px; 
  height: auto; 
  display: block;
  margin: 20px auto; 
}



/////////////////////////////////////////////SearchForm//////////////////////////////////////////

import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter location"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;

////////////////////////////////////////////////////// WeatherDisplay /////////////////////////////////////

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

