import { KeepAndProblemAndTryPoint } from "@/features/introspections/types/introspection";
import { ValidationRules, hasValidationErrorsProps } from "../types/validator";

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

import i18next from 'i18next'
import { zodI18nMap } from "zod-i18n-map"
import translation from 'zod-i18n-map/locales/ja/zod.json'
import { z } from 'zod';

i18next.init({
  lng: 'ja',
  resources: {
    ja: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export const stackSchema = z.object({
  skill: z.string().min(1, 'スキルの選択は必須です'),
  stacked_at: z.date(),
  minutes: z.number().min(1, '積み上げ時間の入力は必須です'),
  title: z.string().min(1, 'タイトルの入力は必須です'),
  description: z.string().optional(),
});