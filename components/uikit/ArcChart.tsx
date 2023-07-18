import React, { useState, useEffect, FC } from 'react'
import { ArcChartData, ArcChartOption } from '@/types/types';
import { Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ArcChart: FC = () => {
  const [arcChartData, setArcChartData] = useState<ArcChartData | null>(null);
  const [arcChartOption, setArcChartOption] = useState<ArcChartOption | null>(null);

  useEffect(() => {
    const labels = ["Ruby on Rails", "PHP", "React", "Next", "TypeScript", "WordPress"];

    const formattedChartData: ArcChartData = {
      labels,
      datasets: [
        {
          label: "学習時間",
          data: [30, 20, 40, 10, 5, 50],
          borderColor: ["#ffdad3", "#f9c5f7", "#b3f7bb", "#b4eaf7", "#faf49c", "#c9bbf7"],
          backgroundColor: ["#ffdad3", "#f9c5f7", "#b3f7bb", "#b4eaf7", "#faf49c", "#c9bbf7"],
          borderWidth: 1
        },
      ],
    };

    const formattedChartOptions: ArcChartOption = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "積み上げスキル",
        },
      },
    };

    setArcChartData(formattedChartData);
    setArcChartOption(formattedChartOptions)
  }, [])
  
  return (
    <>
      {arcChartData && (
        //@ts-ignore
        <Pie options={arcChartOption} data={arcChartData} />
      )}
    </>
  )
}

export default ArcChart
