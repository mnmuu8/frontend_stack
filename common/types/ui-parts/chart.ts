import { TooltipItem } from "chart.js";

export type ChartProps = {
  data: any;
  option: any;
  type: 'bar' | 'pie';
};

export type ChartDataState = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    bgColor: string[];
    bdColor: string[];
    bdWidth: number;
  };
};

export type AnnotationLine = {
  type: 'line';
  yMin: number;
  yMax: number;
  borderColor: string;
  borderWidth: number;
};

export type ChartOptionState = {
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

export type ChartDataProps = {
  labels: string[];
  label: string;
  data: number[];
  bgColor: string[];
  bdColor: string[];
  bdWidth: number;
}
