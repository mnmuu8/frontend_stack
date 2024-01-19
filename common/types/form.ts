import { Dispatch, SetStateAction } from 'react';
import { KeepAndProblemAndTryPoint } from '@/features/introspections/types/introspection';

export type FormType =
  | 'updateUser'
  | 'createStack'
  | 'createStackIntrospection'
  | 'showStackIntrospection'
  | 'updateStackIntrospection'
  | 'createTeam'
  | 'inviteTeam'
  | 'updateTeam'
  | 'createOutput'
  | 'createOutputComment';

export type setFormGroupProps = {
  label: string;
  component: React.JSX.Element;
  button: React.JSX.Element;
};

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
  value?: string | number;
};

export type IntrospectionFormDataParams = {
  reason: string;
  evaluation: number;
  keeps: KeepAndProblemAndTryPoint[];
  problems: KeepAndProblemAndTryPoint[];
  tries: KeepAndProblemAndTryPoint[];
  stack_id?: number;
};

export type OutputFormDataParams = {
  content: string;
};

export type OutputCommentFormDataParams = {
  content: string;
  outputId: number;
};

export type ResetFormValueProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  setIsRegisterEvent: Dispatch<SetStateAction<boolean>>;
};
