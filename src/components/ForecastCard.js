import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Button } from "antd";

const { Text, Paragraph } = Typography;

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
    <Card title={date} style={{ marginBottom: 16, justifyContent: "center" }}>
    <Paragraph>
      <Text strong>High:</Text>{" "}
      {convertTofahrenheit(maxTemp).toFixed(0)}°F{" | "}
      <Text strong>Low:</Text>{" "}
      {convertTofahrenheit(minTemp).toFixed()}°F
    </Paragraph>
    <Paragraph>
      <Text strong>Wind:</Text> {convertToMph(wind).toFixed(0)} MPH
    </Paragraph>
    <Paragraph>
      <Text strong>Sunrise:</Text> {sunrise}
    </Paragraph>
    <Paragraph>
      <Text strong>Sunset:</Text> {sunset}
    </Paragraph>
    <Link to={`/weather-details/${date}?zipCode=${zipCode}`}>
      <Button type="primary">Details</Button>
    </Link>
  </Card>
  );
};

export default ForecastCard;
