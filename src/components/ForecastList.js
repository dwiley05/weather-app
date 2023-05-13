import React, { useEffect, useState } from "react";
import ForecastCard from "./ForecastCard";
import { Collapse, Button } from "antd";
import { getForecast } from "../services/weatherService";
import "./ForecastList.css";

const { Panel } = Collapse;

const convertToDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayOfWeek];
};

const convertToF = (temp) => {
  return (temp * 9) / 5 + 32;
};

const ForecastList = ({ zipCode }) => {
  const [forecasts, setForecasts] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forecast = await getForecast(zipCode, visibleItems);
        setForecasts(forecast);
      } catch (error) {
        console.error("Error fetching forecasts:", error);
      }
    };

    fetchData();
  }, [zipCode, visibleItems]);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 7);
  };

  return (
    <div className="forecast-list">
      <Collapse
        accordion
        className="custom-collapse"
        expandIconPosition="right"
      >
        {forecasts.map((forecast) => (
          <Panel
            key={forecast.date_epoch}
            header={
              <div className="custom-panel d-flex flex-row align-items-center">
                <div className="day-date-wrapper">
                  <p className="m-0">{convertToDayOfWeek(forecast.date)}</p>
                  <p className="m-0">{forecast.date}</p>
                </div>
                <img
                  className="header-icon ms-5"
                  src={forecast.day.condition.icon}
                  alt={forecast.day.condition.text}
                  style={{ width: "64px" }}
                />
                <p className="ms-5 d-none d-md-flex">
                  {forecast.day.condition.text}
                </p>
                <p className="ms-auto me-5 avg-temp">
                  {convertToF(forecast.day.avgtemp_c).toFixed()}°F
                </p>
              </div>
            }
          >
            <ForecastCard
              date={forecast.date}
              condition={forecast.day.condition}
              maxTemp={forecast.day.maxtemp_c}
              minTemp={forecast.day.mintemp_c}
              wind={forecast.day.maxwind_kph}
              sunrise={forecast.astro.sunrise}
              sunset={forecast.astro.sunset}
            />
          </Panel>
        ))}
      </Collapse>
      {forecasts.length && (
        <div className="load-more">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default ForecastList;
