import React, { useState, useEffect } from "react";
import { getCurrentWeather, getForecast } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import SearchForm from "./components/SearchForm";
import AdUnit from "./AdUnit";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    if (!zipCode) return;

    const fetchData = async () => {
      try {
        const weather = await getCurrentWeather(zipCode);
        setWeatherData(weather);

        const forecast = await getForecast(zipCode);
        setForecastData(forecast);
      } catch (error) {
        console.error("Error fetching weather and forecast data:", error);
      }
    };

    fetchData();
  }, [zipCode]);

  const handleSearch = (searchZipCode) => {
    setZipCode(searchZipCode);
  };

  return (
    <div className="app-container">
      <AdUnit></AdUnit>
      <div className="title">Simple Weather</div>
      <SearchForm onSearch={handleSearch} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
      <ForecastList forecasts={forecastData?.forecast.forecastday || []} />
    </div>
  );
};

export default App;
