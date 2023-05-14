import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Card, Descriptions, Typography, Button, Row, Col } from "antd";
import { getForecast } from "../services/weatherService";
import TemperatureChart from "./TemperatureChart";
import "./WeatherDetails.css";

const { Title } = Typography;

const WeatherDetails = () => {
  const { date } = useParams();
  const routeLocation = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);

  const convertToDayOfWeek = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayOfWeek = new Date(date).getDay();
    return days[(dayOfWeek + 1) % 7];
  };

  useEffect(() => {
    const getZipCodeFromQuery = () => {
      const searchParams = new URLSearchParams(routeLocation.search);
      return searchParams.get("zipCode");
    };

    const zipCode = getZipCodeFromQuery();
    const fetchData = async () => {
      try {
        const fetchedForecast = await getForecast(zipCode, 30);
        setForecast(fetchedForecast);
        const weatherForDate = fetchedForecast.find(
          (item) => item.date === date
        );
        setWeatherData(weatherForDate);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [date, routeLocation]);

  if (!weatherData || !forecast) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card
            title={`Weather Details for ${convertToDayOfWeek(date)} ${date}`}
          >
            <Title level={3}>{weatherData.day.condition.text}</Title>
            <img
              src={weatherData.day.condition.icon}
              alt={weatherData.day.condition.text}
            />
            <div className="mt-3">
              <Descriptions column={{ xs: 1, sm: 2 }} bordered className="large-values">
                <Descriptions.Item label="Max Temperature">
                  {weatherData.day.maxtemp_f}°F
                </Descriptions.Item>
                <Descriptions.Item label="Min Temperature">
                  {weatherData.day.mintemp_f}°F
                </Descriptions.Item>
                <Descriptions.Item label="Avg Temperature">
                  {weatherData.day.avgtemp_f}°F
                </Descriptions.Item>
                <Descriptions.Item label="Wind Speed">
                  {weatherData.day.maxwind_mph} mph
                </Descriptions.Item>
                <Descriptions.Item label="Humidity">
                  {weatherData.day.avghumidity}%
                </Descriptions.Item>
                <Descriptions.Item label="Precipitation">
                  {weatherData.day.totalprecip_in} in
                </Descriptions.Item>
                <Descriptions.Item label="Visibility">
                  {weatherData.day.avgvis_miles} miles
                </Descriptions.Item>
                <Descriptions.Item label="Chance of Rain">
                  {weatherData.day.daily_chance_of_rain}%
                </Descriptions.Item>
                <Descriptions.Item label="Chance of Snow">
                  {weatherData.day.daily_chance_of_snow}%
                </Descriptions.Item>
                <Descriptions.Item label="UV Index">
                  {weatherData.day.uv}
                </Descriptions.Item>
              </Descriptions>
              <div className="mt-4 d-none d-md-block temp-label">
                Temperature
              </div>
              <Row justify="center" className="d-none d-md-flex mt-3">
                <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                  <TemperatureChart
                    hourData={weatherData.hour}
                    forecast={forecast}
                    date={date}
                  />
                </Col>
              </Row>
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
