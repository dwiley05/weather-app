import React from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import SearchForm from './components/SearchForm';

const WeatherSearchPage = ({ onSearch, weatherData, forecastData, zipCode }) => {
  return (
    <>
      <SearchForm onSearch={onSearch} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {forecastData && <ForecastList forecasts={forecastData || []} zipCode={zipCode} />}
    </>
  );
};

export default WeatherSearchPage;
