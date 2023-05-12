import React from "react";
import ForecastCard from "./ForecastCard";
import "./ForecastList.css";

const ForecastList = ({ forecasts }) => {
  return (
    <div className="forecast-list">
      {forecasts.map((forecast) => (
        <ForecastCard
          key={forecast.date_epoch}
          date={forecast.date}
          condition={forecast.day.condition}
          maxTemp={forecast.day.maxtemp_c}
          minTemp={forecast.day.mintemp_c}
          wind={forecast.day.maxwind_kph}
        />
      ))}
    </div>
  );
};

export default ForecastList;
