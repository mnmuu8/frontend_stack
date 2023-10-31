import { SelectChangeEvent } from '@mui/material/Select';
import { IntrospectionProps, KeepAndProblemAndTryPoint } from './introspection';
import { Dispatch, SetStateAction } from 'react';

export type FormType = 'updateUser' | 'createStack' | 'createStackIntrospection' | 'showStackIntrospection' | 'updateStackIntrospection' | 'createTeam' | 'updateTeam'

export type FormTypeProps = {
  formType: FormType;
}

export type setFormGroupProps = {
  label: string;
  component: React.JSX.Element;
  button: React.JSX.Element;
}

export type TextInputProps = {
  name: string;
  fullWidth: boolean;
  multiline: boolean;
  minRows: number;
  required?: boolean;
  requiredMessage?: string;
  label: string;
  placeholder: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>; 
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  value?: string | number
}

export type SelectBoxProps = {
  selectedOption: string;
  handleOptionChange: (event: SelectChangeEvent<string>) => void;
}

export type TeamFormDataParams = {
  id?: number,
  name: string
}

export type UserFormDataParams = {
  role: string;
  name: string;
  email: string;
  profile_content: string;
  team: TeamFormDataParams;
}

export type StackFormDataParams = {
  skill: string;
  stacked_at: Date;
  minutes: number;
  title: string;
  description: string;
}

export type IntrospectionFormDataParams = {
  reason: string;
  evaluation: number;
  keeps: KeepAndProblemAndTryPoint[];
  problems: KeepAndProblemAndTryPoint[];
  tries: KeepAndProblemAndTryPoint[];
  stack_id?: number;
}

export type ResetFormValueProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  setIsRegisterEvent: Dispatch<SetStateAction<boolean>>;
  setIsValidate: Dispatch<SetStateAction<boolean>>;
  setStackFormData: Dispatch<SetStateAction<StackFormDataParams>>;
  setIntrospectionFormData: Dispatch<SetStateAction<IntrospectionFormDataParams>>;
  setUserFormData: Dispatch<SetStateAction<UserFormDataParams>>;
  setTeamFormData: Dispatch<SetStateAction<TeamFormDataParams>>;
  setShowStackIntrospection: Dispatch<SetStateAction<IntrospectionProps>>;
}