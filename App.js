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
