import React, { FC, useState, useEffect } from 'react'
import { BarChartData, BarChartOption } from '@/types/types';
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  Title,
  Tooltip,
  Legend
);

const BarChart: FC = () => {
  const [barChartData, setBarChartData] = useState<BarChartData | null>(null);
  const [barChartOption, setBarChartOption] = useState<BarChartOption | null>(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const generateStudyTimeData = (daysInMonth: number): number[] => {
      const studyTimeData: number[] = [];
      for (let i = 0; i < daysInMonth; i++) {
        studyTimeData.push(Math.floor(Math.random() * 16));
      }
      return studyTimeData;
    }

    const generateLabels = (daysInMonth: number): string[] => {
      const labels: string[] = [];
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(i.toString());
      }
      return labels;
    };

    const studyTimeData = generateStudyTimeData(daysInMonth);
    const labels = generateLabels(daysInMonth);

    const formattedChartData: BarChartData = {
      labels,
      datasets: [
        {
          label: "時間",
          data: studyTimeData,
          borderColor: "rgb(39, 119, 169)",
          backgroundColor: "rgb(240, 248, 250)",
          borderWidth: 1
        },
      ],
    };

    const formattedChartOptions: BarChartOption = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: currentMonth + "月の学習時間",
        },
      },
    }; 

    setBarChartData(formattedChartData);
    setBarChartOption(formattedChartOptions)
  }, [])
  
  return (
    <>
      {barChartData && (
        //@ts-ignore
        <Bar options={barChartOption} data={barChartData} />
      )}
    </>
  )
}

export default BarChart
