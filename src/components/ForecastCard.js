import React from "react";
import "./ForecastCard.css";

const ForecastCard = ({ date, condition, maxTemp, minTemp, wind }) => {
  const convertTofahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  function getDayOfWeek(dateString) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return days[dayOfWeek];
  }

  const convertToMph = (wind) => {
    return wind / 1.609;
  };

  date = getDayOfWeek(date);

  return (
    <div className="forecast-card">
      <h4>{date}</h4>
      <img src={condition.icon} alt={condition.text} />
      <p>{condition.text}</p>
      <p>
        High: {convertTofahrenheit(maxTemp).toFixed(0)}°F | Low:{" "}
        {convertTofahrenheit(minTemp).toFixed()}°F
      </p>
      <p>Wind: {convertToMph(wind).toFixed(0)} MPH</p>
    </div>
  );
};

export default ForecastCard;
