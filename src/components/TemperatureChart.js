import React from "react";
import { Bar } from "react-chartjs-2";
import {
  LinearScale,
  CategoryScale,
  Chart,
  BarController,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  LinearScale,
  CategoryScale,
  ChartDataLabels,
  BarController,
  BarElement
);

const TemperatureChart = ({ hourData, forecast, date }) => {
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
        label: "Temperature",
        data: next12HoursData.map((item) => item.temp_f),
        backgroundColor: "rgba(0, 123, 255, 0.4)", // Blue background color with some transparency
        borderColor: "rgba(0, 123, 255, 1)", // Solid blue border color
        borderWidth: 1,
      },
    ],
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
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default TemperatureChart;
