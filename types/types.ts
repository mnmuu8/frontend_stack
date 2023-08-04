import { ReactNode } from "react"
import { UseFormSetValue, Control, ControllerRenderProps } from 'react-hook-form';
import { SelectChangeEvent } from '@mui/material/Select';

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

export type ChartData =  {
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

export type ChartProps =  {
  labels: string[];
  label: string;
  data: number[];
  bdColor: string[];
  bgColor: string[];
  bdwidth: number;
  text: string;
  type: "bar" | "pie";
}

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
  height: number;
  width: number;
  isHeader: boolean;
  created_at?: string;
}

export type Skill = {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type StackFormData = {
  title: string;
  editorContent: string;
  skill: Skill | null;
  time: number;
  date: Date | any;
}

export type onSubmitType = (data: StackFormData) => void;

export type ControlProps = {
  control: Control<StackFormData, any>
}
export type DateInputProps = ControlProps;
export type RichTextEditorProps = ControlProps;
export type CheckBoxGroupProps = ControlProps & {
  setValue: UseFormSetValue<StackFormData>
}

export type CheckBoxLabelProps = {
  skill: Skill;
  setValue: UseFormSetValue<StackFormData>;
  field: ControllerRenderProps<StackFormData, "skill">;
}

export type TextInputProps = ControlProps & {
  name: "time" | "title";
  fullWidth: boolean;
  multiline: boolean;
  minRows: number;
  required: boolean;
  requiredMessage: string;
  label: string;
  placeholder: string;
  type: string;
}

export type StackCardProps = {
  stack: {
    id: number;
    title: string;
    minutes: number;
    skill: Skill[];
    description: string;
    stacked_at: string;
    created_at: string;
    updated_at: string;
  }
}

export type SelectBoxProps = {
  selectedOption: string;
  handleOptionChange: (event: SelectChangeEvent<string>) => void;
}