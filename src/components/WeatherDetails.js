import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Card, Descriptions, Typography, Button, Row, Col } from "antd";
import { getForecast } from "../services/weatherService";

const { Title } = Typography;

const WeatherDetails = () => {
  const { date } = useParams();
  const routeLocation = useLocation();
  const [weatherData, setWeatherData] = useState(null);

  const convertToFahrenheit = (tempC) => {
    return (tempC * 9) / 5 + 32;
  };

  const convertToMph = (windKph) => {
    return windKph / 1.609;
  };

  useEffect(() => {
    const getZipCodeFromQuery = () => {
      const searchParams = new URLSearchParams(routeLocation.search);
      return searchParams.get("zipCode");
    };

    const zipCode = getZipCodeFromQuery();
    const fetchData = async () => {
      try {
        const forecast = await getForecast(zipCode, 30);
        const weatherForDate = forecast.find((item) => item.date === date);
        setWeatherData(weatherForDate);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [date, routeLocation]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
    <Row justify="center">
      <Col xs={24} sm={22} md={20} lg={18} xl={16}>
        <Card title={`Weather Details for ${date}`}>
          <Title level={3}>{weatherData.day.condition.text}</Title>
          <img
            src={weatherData.day.condition.icon}
            alt={weatherData.day.condition.text}
          />
          <div className="mt-3">
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Max Temperature">
                {convertToFahrenheit(weatherData.day.maxtemp_c).toFixed(1)}°F
              </Descriptions.Item>
              <Descriptions.Item label="Min Temperature">
                {convertToFahrenheit(weatherData.day.mintemp_c).toFixed(1)}°F
              </Descriptions.Item>
              <Descriptions.Item label="Avg Temperature">
                {convertToFahrenheit(weatherData.day.avgtemp_c).toFixed(1)}°F
              </Descriptions.Item>
              <Descriptions.Item label="Wind Speed">
                {convertToMph(weatherData.day.maxwind_kph).toFixed(1)} MPH
              </Descriptions.Item>
              <Descriptions.Item label="Humidity">
                {weatherData.day.avghumidity}%
              </Descriptions.Item>
              <Descriptions.Item label="Sunrise">
                {weatherData.astro.sunrise}
              </Descriptions.Item>
              <Descriptions.Item label="Sunset">
                {weatherData.astro.sunset}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="mt-4">
            <Link to={`/`}>
              <Button type="primary">Back</Button>
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
  );
};

export default WeatherDetails;
