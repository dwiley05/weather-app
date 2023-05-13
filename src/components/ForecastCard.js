import React from "react";
import "antd/dist/reset.css";
import "./ForecastCard.css";

const ForecastCard = ({ date, condition, maxTemp, minTemp, wind, sunrise, sunset }) => {
  const convertTofahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  const convertToMph = (wind) => {
    return wind / 1.609;
  };

  return (
    <div>
      <p>
        High: {convertTofahrenheit(maxTemp).toFixed(0)}°F | Low:{" "}
        {convertTofahrenheit(minTemp).toFixed()}°F
      </p>
      <p>Wind: {convertToMph(wind).toFixed(0)} MPH</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
};

export default ForecastCard;
