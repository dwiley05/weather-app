import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  LinearScale,
  CategoryScale,
  Chart,
  BarController,
  BarElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  LinearScale,
  CategoryScale,
  ChartDataLabels,
  BarController,
  BarElement,
  Tooltip
);

const TemperatureChart = ({ hourData, forecast, date }) => {
  const [dataType, setDataType] = useState("temperature"); // Default data type is temperature
  const currentHour = new Date().getHours(); // Get the current hour (0-23)
  const nextDayForecast = forecast.find((item) => item.date === date);
  const nextDayHourData = nextDayForecast ? nextDayForecast.hour : [];

  const next12HoursData = [
    ...hourData.slice(currentHour),
    ...nextDayHourData.slice(0, 12 - (hourData.length - currentHour)),
  ];

  const chartData = {
    labels: next12HoursData.map((item) => {
      const hour = new Date(item.time).getHours();
      const isAM = hour < 12;
      const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = isAM ? "AM" : "PM";
      return `${formattedHour}:00 ${period}`; // Format the hour as "X:00 AM/PM"
    }),
    datasets: [
      {
        label: dataType === "temperature" ? "Temperature" : "Rain %",
        data: next12HoursData.map((item) => {
          return dataType === "temperature" ? item.temp_f : item.chance_of_rain;
        }),
        backgroundColor: "rgba(0, 123, 255, 0.4)", // Blue background color with some transparency
        borderColor: "rgba(0, 123, 255, 1)", // Solid blue border color
        borderWidth: 1,
      },
    ],
  };

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        beginAtZero: true,
        ticks: {
          color: "black", // Set the color of the tick labels
          font: {
            weight: "bold", // Set the font weight of the tick labels
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white", // Set the tick label color to white
          font: {
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      datalabels: {
        color: "black", // Set the color of the data labels
        font: {
          weight: "bold", // Set the font weight of the data labels
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (context) => {
            const dataIndex = context[0].dataIndex;
            const dataPoint = next12HoursData[dataIndex];
            return new Date(dataPoint.time).toLocaleTimeString(); // Display the time as the tooltip title
          },
          label: (context) => {
            const dataIndex = context.dataIndex;
            const dataPoint = next12HoursData[dataIndex];

            const tooltipItems = [
              `Temp: ${dataPoint.temp_f}°F`,
              `Humidity: ${dataPoint.humidity}%`,
              `Wind: ${dataPoint.wind_mph} mph`,
              `Precipitation: ${dataPoint.precip_in} in`,
            ];

            return tooltipItems;
          },
        },
      },
    },
  };

  return (
    <>
      <select value={dataType} onChange={handleDataTypeChange}>
        <option value="temperature">Temperature</option>
        <option value="rain">Rain %</option>
        {/* Add other data types as needed */}
      </select>
      <Bar data={chartData} options={chartOptions} />
    </>
  );
};

export default TemperatureChart;
