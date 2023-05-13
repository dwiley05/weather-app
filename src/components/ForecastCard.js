import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForecastCard = ({ date, condition, maxTemp, minTemp, wind, sunrise, sunset }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/weather-details/${date}`);
  };

  const convertTofahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  const convertToMph = (wind) => {
    return wind / 1.609;
  };

  return (
    <Card title={date} style={{ width: 300, marginBottom: 16 }}>
      <p>
        High: {convertTofahrenheit(maxTemp).toFixed(0)}°F | Low: {convertTofahrenheit(minTemp).toFixed()}°F
      </p>
      <p>Wind: {convertToMph(wind).toFixed(0)} MPH</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
      <Button type="primary" onClick={handleDetailsClick}>
        Details
      </Button>
    </Card>
  );
};

export default ForecastCard;
