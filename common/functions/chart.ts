import { ChartDataProps } from "../types/ui-parts/chart";

export const getChartData = ({labels, label, data, bgColor, bdColor, bdWidth}: ChartDataProps) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: bgColor,
        borderColor: bdColor,
        borderWidth: bdWidth,
      },
    ],
  }
  return chartData;
};

export const getChartOption = (text: string) => {
  const chartOption = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: text,
      },
    },
  };

  return chartOption;
}
