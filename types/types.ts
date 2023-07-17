import { ReactNode } from "react"

export type LayoutProps = {
  children: ReactNode
}

export type ImageWrapperProps = {
  src: string
  alt: string
  width: number
  height: number
  className: string
}

export type sidebarMenus = {
  id: string;
  label: string;
  value: string;
}

type ChartData =  {
  labels: string[];
  datasets: any[];
}

type ChartOption = {
  responsive: boolean;
  plugins: {
    title: {
      display: boolean;
      text: string;
    };
  };
}

export type BarChartData = ChartData;
export type BarChartOption = ChartOption;
export type ArcChartData = ChartData;
export type ArcChartOption = ChartOption;