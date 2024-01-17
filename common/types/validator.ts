import { TeamFormDataParams } from './form';
import { KeepAndProblemAndTryPoint } from '@/features/introspections/types/introspection';

export type ValidationRules = {
  [key: string]: (value: string) => boolean;
};

export type ErrorMessages = {
  [key: string]: string;
};

export type SetErrorMessages = {
  setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages>>;
};

export type ErrorMessagesProps = {
  errorMessages: ErrorMessages;
  errorKey: string;
};

export type ErrorMessagesState = SetErrorMessages & {
  errorMessages: ErrorMessages;
};

export type hasValidationErrorsProps = string | number | Date | TeamFormDataParams | KeepAndProblemAndTryPoint[];

export type validationCheckProps = ErrorMessagesState & {
  name: string;
  value: string;
  validationRules: ValidationRules;
};
