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

const Chart: FC<ChartProps> = ({ labels, label, data, bdColor, bgColor, bdwidth, text, type, pattern }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartOption, setChartOption] = useState<ChartOption | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'pie' | null>(null);

  const RankingIndex = (minutes: number) => {
    if (minutes <= 10000) return 'ブロンズ';
    if (minutes > 10000 && minutes <= 30000) return 'シルバー';
    if (minutes > 30000 && minutes <= 60000) return 'ゴールド';
    if (minutes > 60000 && minutes <= 100000) return 'プラチナ';
    if (minutes > 100000 && minutes <= 300000) return 'ダイヤモンド';
    if (minutes > 300000 && minutes <= 600000) return 'マスター';
    if (minutes > 600000) return 'レジェンド';
  };

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
  };

  const getChartOptions = (pattern: string) => {
    if (pattern === 'SkillRankGraph') {
      const maxDataValue = Math.max(...data);
      const scaledMax = maxDataValue * 1.2;

      const chartOptions: ChartOption = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: text,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const minutes = context.parsed.y;
                const rank = RankingIndex(minutes);
                return `時間: ${minutes}  ランク: ${rank}`;
              },
            },
          },
          annotation: {
            annotations: {
              legendLine: {
                type: 'line',
                yMin: 600000,
                yMax: 600000,
                borderColor: 'rgba(224, 17, 95, 0.5)',
                borderWidth: 2,
              },
              masterLine: {
                type: 'line',
                yMin: 300000,
                yMax: 300000,
                borderColor: 'rgba(75, 0, 130, 0.5)',
                borderWidth: 2,
              },
              diamondLine: {
                type: 'line',
                yMin: 100000,
                yMax: 100000,
                borderColor: 'rgba(173, 216, 230, 0.5)',
                borderWidth: 2,
              },
              platinumLine: {
                type: 'line',
                yMin: 60000,
                yMax: 60000,
                borderColor: 'rgba(192, 192, 224, 0.5)',
                borderWidth: 2,
              },
              goldLine: {
                type: 'line',
                yMin: 30000,
                yMax: 30000,
                borderColor: 'rgba(255, 215, 0, 0.5)',
                borderWidth: 2,
              },
              silverLine: {
                type: 'line',
                yMin: 10000,
                yMax: 10000,
                borderColor: 'rgba(192, 192, 192, 0.5)',
                borderWidth: 2,
              },
            },
          },
        },
        scales: {
          y: {
            suggestedMax: scaledMax,
          },
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
  };

  useEffect(() => {
    const formattedChartData = getChartData();
    const formattedChartOptions = getChartOptions(pattern);

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
