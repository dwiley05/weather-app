import React from "react";
import { Card, Typography, Row, Col } from "antd";
import "./WeatherCard.css";

const { Title, Text } = Typography;

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
    <div className="weather-card-container mt-4">
      <Card
        className="weather-card"
        title={
          <div className="card-title d-flex flex-row">
            <h3>Today</h3>
            <img
              src={condition.icon}
              alt={condition.text}
              className="weather-icon ms-auto"
            />
          </div>
        }
      >
        <Typography>
          <Title level={4} className="city">
            {name}, {region}
          </Title>
          <Row gutter={[16, 8]}>
            <Col>
              <Text>
                Temperature: {convertTofahrenheit(temp_c).toFixed(0)}°F
              </Text>
            </Col>
            <Col>
              <Text>Humidity: {humidity}%</Text>
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col>
              <Text>Weather: {condition.text}</Text>
            </Col>
            <Col>
              <Text>
                Max Wind Speed: {convertToMph(wind_kph).toFixed(0)} MPH
              </Text>
            </Col>
          </Row>
        </Typography>
      </Card>
    </div>
  );
};

export default WeatherCard;
