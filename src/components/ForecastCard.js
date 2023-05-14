import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

const ForecastCard = ({
  date,
  condition,
  maxTemp,
  minTemp,
  wind,
  sunrise,
  sunset,
  zipCode
}) => {
  const convertTofahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  const convertToMph = (wind) => {
    return wind / 1.609;
  };

  return (
    <Card title={date} style={{ width: 300, marginBottom: 16, justifyContent: "center" }}>
      <p>
        High: {convertTofahrenheit(maxTemp).toFixed(0)}°F | Low:{" "}
        {convertTofahrenheit(minTemp).toFixed()}°F
      </p>
      <p>Wind: {convertToMph(wind).toFixed(0)} MPH</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
      <Link to={`/weather-details/${date}?zipCode=${zipCode}`}>
        <Button type="primary">Details</Button>
      </Link>
    </Card>
  );
};

export default ForecastCard;
