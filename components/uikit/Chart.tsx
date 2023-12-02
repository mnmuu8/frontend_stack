import React, { FC, useState, useEffect } from 'react';
import { ChartProps, ChartData, ChartOption } from '@/types/utils';
import { Bar, Pie } from 'react-chartjs-2';
import Annotation from 'chartjs-plugin-annotation';

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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Annotation);

const Chart: FC<ChartProps> = ({ labels, label, data, bdColor, bgColor, bdwidth, text, type, pattern }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartOption, setChartOption] = useState<ChartOption | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'pie' | null>(null);

  const RankingIndex = (minutes: number) => {
    if (minutes < 100) return 'Opal';
    if (minutes >= 100 && minutes < 200) return 'Bronze';
    if (minutes >= 200 && minutes < 300) return 'Silver';
    if (minutes >= 300 && minutes < 400) return 'Gold';
    if (minutes >= 400 && minutes < 500) return 'Platinum';
    if (minutes >= 500) return 'Diamond';
  }

  const getChartData = () => {
    const chartData: ChartData = {
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

    return chartData;
  }

  const getChartOptions = (pattern: number) => {
    if (pattern === 3) {
      const chartOptions: ChartOption = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: text,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const minutes = context.parsed.y;
                const rank = RankingIndex(minutes);
                return `時間: ${minutes}  ランク: ${rank}`;
              }
            }
          },
          annotation: {
            annotations: {
              diamondLine: { type: 'line', yMin: 500, yMax: 500, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 2 },
              platinumLine: { type: 'line', yMin: 400, yMax: 400, borderColor: 'rgba(229, 228, 226, 0.5)', borderWidth: 2 },
              goldLine: { type: 'line', yMin: 300, yMax: 300, borderColor: 'rgba(255, 215, 0, 0.5)', borderWidth: 2 },
              silverLine: { type: 'line', yMin: 200, yMax: 200, borderColor: 'rgba(192, 192, 192, 0.5)', borderWidth: 2 },
              bronzeLine: { type: 'line', yMin: 100, yMax: 100, borderColor: 'rgba(205, 127, 50, 0.5)', borderWidth: 2 },
            }
          }
        },
      };
      return chartOptions;
    } else {
      const chartOptions: ChartOption = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: text,
          },
        },
      };
      return chartOptions;
    }
  }

  useEffect(() => {
    const formattedChartData = getChartData()
    const formattedChartOptions = getChartOptions(pattern)

    setChartType(type);
    setChartData(formattedChartData);
    setChartOption(formattedChartOptions);
  }, [data, labels]);

  return (
    <>
      {chartType === 'bar' && (
        //@ts-ignore
        <Bar options={chartOption} data={chartData} />
      )}
      {chartType === 'pie' && (
        //@ts-ignore
        <Pie options={chartOption} data={chartData} />
      )}
    </>
  );
};

export default Chart;
