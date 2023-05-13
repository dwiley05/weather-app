import React, { useState, useEffect } from "react";
import { getCurrentWeather, getForecast } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import SearchForm from "./components/SearchForm";
import AdUnit from "./AdUnit";
import { Helmet } from 'react-helmet';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [page, setPage] = useState(6);

  useEffect(() => {
    if (!zipCode) return;

    const fetchData = async () => {
      try {
        const weather = await getCurrentWeather(zipCode);
        setWeatherData(weather);
    
        const forecast = await getForecast(zipCode, page);
        const forecastArray = forecast || []; // Extract the forecast array
        setForecastData(forecastArray);
      } catch (error) {
        console.error("Error fetching weather and forecast data:", error);
      }
    };
    

    fetchData();
  }, [zipCode, page]);

  const handleSearch = (searchZipCode) => {
    setZipCode(searchZipCode);
    setPage(1); // Reset the page when a new search is made
  };

  return (
    <div className="app-container">
      <AdUnit></AdUnit>
      <Helmet>
        <title>Simple Weather - Check Weather by ZIP Code</title>
      </Helmet>
      <div className="title">Simple Weather</div>
      <SearchForm onSearch={handleSearch} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {forecastData && (
        <ForecastList
          forecasts={forecastData || []} // Use the correct property for the forecasts
          zipCode={zipCode}
        />
      )}
    </div>
  );
};

export default App;
