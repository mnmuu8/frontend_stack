import { ReactNode } from "react"
import { StaticImageData } from "next/image";

export type ChildrenProps = {
  children: ReactNode
}
export type LayoutProps = ChildrenProps

export type ImageWrapperProps = {
  src: string | StaticImageData;
  alt: string
  width: number
  height: number
  className: string
}

export type sidebarMenus = {
  id: string;
  label: string;
  value: string;
  icon: React.JSX.Element;
}

export type ChartData = {
  labels: string[];
  datasets: any[];
}

export type ChartOption = {
  responsive: boolean;
  plugins: {
    title: {
      display: boolean;
      text: string;
    };
  };
}

export type ChartProps = {
  labels: string[];
  label: string;
  data: number[];
  bdColor: string[];
  bgColor: string[];
  bdwidth: number;
  text: string;
  type: "bar" | "pie";
}