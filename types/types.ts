import { ReactNode } from "react"
import { UseFormSetValue, Control, FieldErrors } from 'react-hook-form';

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
}

export type StackFormData = {
  title: string;
  description?: string;
  skills: string[];
  time: number;
  date: Date | any;
}

export type onSubmitType = (data: StackFormData) => void;

export type ControlProps = {
  control: Control<StackFormData, any>
}

export type CheckBoxProps = ControlProps & {
  setValue: UseFormSetValue<StackFormData>
}

export type DateInputProps = ControlProps;

export type TextInputProps = ControlProps & {
  control: Control<StackFormData, any>
  name: "time" | "title" | "description" | "skills" | `skills.${number}`
  defaultValue?: string | number | string[] | undefined
  fullWidth: boolean;
  multiline: boolean;
  minRows: number;
  required: boolean;
  requiredMessage: string;
  label: string;
  placeholder: string;
  type: string;
}