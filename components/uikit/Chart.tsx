import React, { FC, useState, useEffect, useMemo } from 'react';
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

type RankingIndex = (minutes: number) => string;

interface ChartProps {
  labels: string[];
  label: string;
  data: number[];
  bdColor: string[];
  bgColor: string[];
  bdwidth: number;
  text: string;
  type: 'bar' | 'pie';
  pattern: string;
}

const RankingIndex: RankingIndex = (minutes: number) => {
  if (minutes <= 10000) return 'ブロンズ';
  if (minutes > 10000 && minutes <= 30000) return 'シルバー';
  if (minutes > 30000 && minutes <= 60000) return 'ゴールド';
  if (minutes > 60000 && minutes <= 100000) return 'プラチナ';
  if (minutes > 100000 && minutes <= 300000) return 'ダイヤモンド';
  if (minutes > 300000 && minutes <= 600000) return 'マスター';
  if (minutes > 600000) return 'レジェンド';
  return '';
};

const BarChart: FC<ChartProps> = ({ labels, label, data, bdColor, bgColor, bdwidth, text, pattern }) => {
  const chartData = useMemo(() => {
    return {
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
  }, [labels, label, data, bdColor, bgColor, bdwidth]);

  const chartOptions = useMemo(() => {
    if (pattern === 'SkillRankGraph') {
      const maxDataValue = Math.max(...data);
      const scaledMax = maxDataValue * 1.2;

      return {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: text,
          },
          tooltip: {
            callbacks: {
              label: (context: Chart.TooltipItem) => {
                const minutes = context.parsed?.y || 0;
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
    } else {
      return {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: text,
          },
        },
      };
    }
  }, [data, text, pattern]);

  return <Bar options={chartOptions} data={chartData} />;
};

const PieChart: FC<ChartProps> = ({ labels, label, data, bdColor, bgColor, bdwidth, text, pattern }) => {
  const chartData = useMemo(() => {
    return {
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
  }, [labels, label, data, bdColor, bgColor, bdwidth]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: text,
        },
      },
    };
  }, [text]);

  return <Pie options={chartOptions} data={chartData} />;
};

const Chart: FC<ChartProps> = ({ type, ...props }) => {
  if (type === 'bar') {
    return <BarChart {...props} />;
  } else if (type === 'pie') {
    return <PieChart {...props} />;
  }
  return null;
};

export default Chart;
