import { ReactNode } from "react"
import { UseFormSetValue, Control, ControllerRenderProps } from 'react-hook-form';
import { SelectChangeEvent } from '@mui/material/Select';

export type UserProps = {
  user?: {
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

export type ChildrenProps = {
  children: ReactNode
}
export type LayoutProps = ChildrenProps
export type UserAuthenticationProps = ChildrenProps

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
  icon: React.JSX.Element;
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

export type UserProfileProps = UserProps & {
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

export type KeepAndProblemAndTryPoint = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type StacksCreateRequestBody = {
  title: string;
  editorContent: string;
  skill: Skill;
  time: number;
  date: Date | any;
}
export type StacksIntrospectionRequestBody = {
  reason: string;
  evaluation: number;
  keeps: KeepAndProblemAndTryPoint[];
  problems: KeepAndProblemAndTryPoint[];
  tries: KeepAndProblemAndTryPoint[];
}
export type UserUpdateRequestBody = {
  name: string;
  email: string;
  profile_content: string;
  team: number;
}

export type FormDataParams = StacksCreateRequestBody & StacksIntrospectionRequestBody & UserUpdateRequestBody;

export type onSubmitType = (data: FormDataParams) => void;

export type ControlProps = {
  control: Control<FormDataParams, any>
}
export type DateInputProps = ControlProps;
export type RichTextEditorProps = ControlProps;

export type ControlAndSetValueProps =  ControlProps & {
  setValue: UseFormSetValue<FormDataParams>
}

export type CheckBoxLabelProps = {
  skill: Skill;
  setValue: UseFormSetValue<FormDataParams>;
  field: ControllerRenderProps<FormDataParams, "skill">;
}

export type TextInputProps = ControlProps & {
  name: any;
  fullWidth: boolean;
  multiline: boolean;
  minRows: number;
  required: boolean;
  requiredMessage: string;
  label: string;
  placeholder: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>; 
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  value?: string | number
}

export type IntrospectionProps = {
  id: number;
  stack_id: number;
  evaluation: number;
  reason: string;
  keep_contents: KeepAndProblemAndTryPoint[];
  problem_contents: KeepAndProblemAndTryPoint[];
  try_contents: KeepAndProblemAndTryPoint[];
} | undefined;

export type StackProps = {
  id: number;
  title: string;
  minutes: number;
  skill: Skill;
  description: string;
  user_id?: number
  introspection?: IntrospectionProps[];
  stacked_at: string;
  created_at: string;
  updated_at: string;
}

export type StackCardProps = UserProps & {
  stack: StackProps;
}

export type SelectBoxProps = {
  selectedOption: string;
  handleOptionChange: (event: SelectChangeEvent<string>) => void;
}

export type FormType = 'updateUser' | 'createStack' | 'createStackIntrospection' | 'showStackIntrospection' | 'updateStackIntrospection'

export type FormTypeProps = ControlAndSetValueProps & {
  formType: FormType;
}

export type setFormGroupProps = {
  label: string;
  component: React.JSX.Element;
  button: React.JSX.Element;
}

export type sessionUser = {
  id: number;
  name: string;
  email: string;
  profile_content: string;
  created_at: string;
  updated_at: string;
  team: Team
} | undefined

export type ApiOptions<T extends Record<string, string | number> = {}> = {
  headers: {
    'Content-Type': string;
    'Authorization': string;
  };
  params?: T;
};

export type Team = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}