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

export type UserProfileProps = {
  user: {
    email?: string | null;
    email_verified?: boolean | null;
    family_name?: string | null;
    given_name?: string | null;
    locale?: string | null;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
    sid?: string | null;
    sub?: string | null;
    updated_at?: string | null;
  }
}
