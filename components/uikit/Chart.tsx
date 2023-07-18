import React, { FC, useState, useEffect } from 'react'
import { ChartProps, ChartData, ChartOption } from '@/types/types';
import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart: FC<ChartProps> = (props) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartOption, setChartOption] = useState<ChartOption | null>(null);
  const [chartType, setChartType] = useState<"bar" | "pie" | null>(null)

  const { labels, label, data, bdColor, bgColor, bdwidth, text, type } = props;

  useEffect(() => {
    const formattedChartData: ChartData = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          borderColor: bdColor,
          backgroundColor: bgColor,
          borderWidth: bdwidth,
        },
      ],
    };
    const formattedChartOptions: ChartOption = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: text,
        },
      },
    }; 

    setChartType(type)
    setChartData(formattedChartData);
    setChartOption(formattedChartOptions);
  }, [])
  
  return (
    <>
      {chartType === "bar" && 
        //@ts-ignore
        <Bar options={chartOption} data={chartData} />
      }
      {chartType === "pie" && 
        //@ts-ignore
        <Pie options={chartOption} data={chartData} />
      }
    </>
  )
}

export default Chart
