import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="search-by">Search by zipcode</div>;
  }

  const { temp_c, humidity, condition } = weatherData;

  const convertTofahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  return (
    <div className="weather-card">
      <h3 className="weather-info">
        Temperature: {convertTofahrenheit(temp_c).toFixed(0)}°F
      </h3>
      <h3 className="weather-info">Humidity: {humidity}%</h3>
      <h3 className="weather-info">Weather: {condition.text}</h3>
    </div>
  );
};

export default WeatherCard;
