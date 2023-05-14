import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import "./WeatherCard.css";

const { Title, Text } = Typography;

const WeatherCard = ({ weatherData }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("weatherData:", weatherData);
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    navigate(
      `/weather-details/${formattedDate}?zipCode=${weatherData.location.name}`
    );
  };

  if (!weatherData || !weatherData.current || !weatherData.location) {
    return <div>Search by Zipcode</div>;
  }

  const {
    temp_c,
    humidity,
    condition,
    wind_kph,
    pressure_mb,
    precip_mm,
    feelslike_f,
    vis_km,
  } = weatherData.current;

  const { name, region } = weatherData.location;

  const convertTofahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  const convertToMph = (wind) => {
    return wind / 1.609;
  };

  return (
    <div className="weather-card-container mt-4">
      <div className="weather-card-link" onClick={handleCardClick}>
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
              <Col span={12}>
                <Text strong>
                  Temperature: {convertTofahrenheit(temp_c).toFixed(0)}°F
                </Text>
              </Col>
              <Col span={12}>
                <Text strong>Humidity: {humidity}%</Text>
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Text strong>Weather: {condition.text}</Text>
              </Col>
              <Col span={12}>
                <Text strong>
                  Max Wind Speed: {convertToMph(wind_kph).toFixed(0)} MPH
                </Text>
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Text strong>Pressure: {pressure_mb} mb</Text>
              </Col>
              <Col span={12}>
                <Text strong>Precipitation: {precip_mm} mm</Text>
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Text strong>Feels Like: {feelslike_f}°F</Text>
              </Col>
              <Col span={12}>
                <Text strong>Visibility: {vis_km} km</Text>
              </Col>
            </Row>
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default WeatherCard;
