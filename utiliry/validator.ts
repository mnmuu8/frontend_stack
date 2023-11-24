import { KeepAndProblemAndTryPoint } from "@/types/introspection";
import { ValidationRules, hasValidationErrorsProps } from "@/types/validator";

export const isRequired = (value: string) => {
  return value.trim() !== '';
};

export const isRequiredArray = (values: KeepAndProblemAndTryPoint[]) => {
  if (values.length > 0) {
    return values.every((value) => value.content.trim() !== '');
  }
  return false;
};

export const hasValidationErrors = <T extends Record<string, hasValidationErrorsProps>>(dates: T) => {
  return Object.values(dates).every((data) => {
    if (Array.isArray(data)) {
      if (data.length === 0) return false;
      return data.every((d) => !!d.content);
    }
    return !!data;
  });
};

export const stackValidationRules: ValidationRules = {
  skill: (value) => isRequired(value),
  stacked_at: (value) => isRequired(value),
  minutes: (value) => isRequired(value),
  title: (value) => isRequired(value),
  description: (value) => isRequired(value),
};

export const introspectionValidationRules: ValidationRules = {
  evaluation: (value) => isRequired(value as string),
  reason: (value) => isRequired(value as string),
}

export const teamValidationRules: ValidationRules = {
  name: (value) => isRequired(value),
};

export const inviteTeamValidationRules: ValidationRules = {
  email: (value) => isRequired(value),
};

export const userValidationRules: ValidationRules = {
  role: (value) => isRequired(value),
  name: (value) => isRequired(value),
  email: (value) => isRequired(value),
  profile_content: (value) => isRequired(value),
  team: (value) => isRequired(value),
};

export const outputValidationRules: ValidationRules = {
  content: (value) => isRequired(value),
};

export const outputCommentValidationRules: ValidationRules = {
  content: (value) => isRequired(value),
};
