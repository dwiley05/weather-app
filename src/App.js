import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getCurrentWeather, getForecast } from './services/weatherService';
import WeatherSearchPage from './WeatherSearchPage';
import WeatherDetails from './components/WeatherDetails';
import AdUnit from './AdUnit';
import { Helmet } from 'react-helmet';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [zipCode, setZipCode] = useState('');
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
        console.error('Error fetching weather and forecast data:', error);
      }
    };

    fetchData();
  }, [zipCode, page]);

  const handleSearch = (searchZipCode) => {
    setZipCode(searchZipCode);
    setPage(1); // Reset the page when a new search is made
  };

  return (
    <Router>
      <div className="app-container">
        <AdUnit></AdUnit>
        <Helmet>
          <title>Simple Weather - Check Weather by ZIP Code</title>
        </Helmet>
        <div className="title">Simple Weather</div>
        <Routes>
          <Route
            path="/"
            element={
              <WeatherSearchPage
                onSearch={handleSearch}
                weatherData={weatherData}
                forecastData={forecastData}
                zipCode={zipCode}
              />
            }
          />
          <Route path="/weather-details/:date" element={<WeatherDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
