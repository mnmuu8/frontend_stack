import React, { FC, useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Annotation from 'chartjs-plugin-annotation';
import { ChartDataState, ChartOptionState, ChartProps } from '@/common/types/ui-parts/chart';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Annotation,
);

const Chart: FC<ChartProps> = ({ data, type, option }) => {
  const [chartData, setChartData] = useState<ChartDataState | null>(null);
  const [chartOption, setChartOption] = useState<ChartOptionState | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'pie' | null>(null);

  useEffect(() => {
    setChartType(type);
    setChartData(data);
    setChartOption(option);
  }, [data]);

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
