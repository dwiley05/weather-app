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

const TemperatureChart = (data) => {
  // const filteredData = data.hourData.filter((item) => {
  //   const itemDate = new Date(item.time);
  //   return itemDate.getTime() >= new Date().getTime(); // Filter based on the current time
  // });

  const currentHour = new Date().getHours(); // Get the current hour (0-23)

  const chartData = {
    labels: data.hourData
      .filter((item) => {
        const hour = parseInt(item.time.split(' ')[1].split(':')[0]);
        return hour >= currentHour; // Filter based on the hour
      })
      .map((item) => {
        const hour = parseInt(item.time.split(' ')[1].split(':')[0]);
        const isAM = hour < 12;
        const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = isAM ? 'AM' : 'PM';
        return `${formattedHour}:00${period}`; // Format the hour as "X:00AM/PM"
      }),
    datasets: [
      {
        label: "Temperature",
        data: data.hourData
          .filter((item) => {
            const hour = parseInt(item.time.split(' ')[1].split(':')[0]);
            return hour >= currentHour; // Filter based on the hour
          })
          .map((item) => item.temp_f),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
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
          color: "black", // Set the color of the tick labels
          font: {
            weight: "bold", // Set the font weight of the tick labels
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
  

  return (<Bar data={chartData} options={chartOptions} />);
};

export default TemperatureChart;
