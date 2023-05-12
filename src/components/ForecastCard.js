import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ date, condition, maxTemp, minTemp }) => {

    const convertTofahrenheit = (temp) => {
        return (temp * 9) / 5 + 32;
      };

  return (
    <div className="forecast-card">
      <h4>{date}</h4>
      <img src={condition.icon} alt={condition.text} />
      <p>{condition.text}</p>
      <p>
        High: {convertTofahrenheit(maxTemp)}°F | Low: {convertTofahrenheit(minTemp)}°F
      </p>
    </div>
  );
};

export default ForecastCard;
