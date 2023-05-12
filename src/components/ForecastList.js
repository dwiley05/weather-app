import React from 'react';
import ForecastCard from './ForecastCard';
import './ForecastList.css';

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
        />
      ))}
    </div>
  );
};

export default ForecastList;
