import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { TooltipItem } from 'chart.js';
import { siteTitle } from '../config';

export type ChildrenProps = {
  children: ReactNode;
};
export type LayoutProps = ChildrenProps;

export type ImageWrapperProps = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export type sidebarMenus = {
  id: string;
  label: string;
  value: string;
  icon: React.JSX.Element;
};

export type ChartData = {
  labels: string[];
  datasets: any[];
};

export type AnnotationLine = {
  type: 'line';
  yMin: number;
  yMax: number;
  borderColor: string;
  borderWidth: number;
};

export type ChartOption = {
  responsive: boolean;
  plugins: {
    title: {
      display: boolean;
      text: string;
    };
    tooltip?: {
      callbacks: {
        label: (context: TooltipItem<'bar'>) => string;
      };
    };
    annotation?: {
      annotations: {
        legendLine: AnnotationLine;
        masterLine: AnnotationLine;
        diamondLine: AnnotationLine;
        platinumLine: AnnotationLine;
        goldLine: AnnotationLine;
        silverLine: AnnotationLine;
      };
    };
  };
  scales?: {
    y: {
      suggestedMax: number;
      title: {
        display: boolean;
        text: string;
      };
    };
    x: {
      title: {
        display: boolean;
        text: string;
      }
    }
  };
};

export type ChartProps = {
  labels: string[];
  label: string;
  data: number[];
  bdColor: string[];
  bgColor: string[];
  bdwidth: number;
  text: string;
  type: 'bar' | 'pie';
  pattern: string;
};

export type FormSubmitButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  label: string;
};
export type FormCancelButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
