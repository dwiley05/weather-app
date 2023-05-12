import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || !weatherData.current || !weatherData.location) {
    return <div>Search by Zipcode</div>;
  }

  const { temp_c, humidity, condition, wind_kph } = weatherData.current;
  const { name, region } = weatherData.location;

  const convertTofahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  const convertToMph = (wind) => {
    return wind / 1.609;
  };

  return (
    <div className="card">
      <h2>Today</h2>
      <h3 className="weather-info">
        <h1 className="city">
          {name}, {region}
        </h1>
        Temperature: {convertTofahrenheit(temp_c).toFixed(0)}°F
      </h3>
      <h3 className="weather-info">Humidity: {humidity}%</h3>
      <h3 className="weather-info">Weather: {condition.text}</h3>
      <h3 className="weather-info">
        Max Wind Speed: {convertToMph(wind_kph).toFixed(0)} MPH
      </h3>
    </div>
  );
};

export default WeatherCard;
