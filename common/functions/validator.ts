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

const passwordSchema = z.string()
  .min(8, 'パスワードは8文字以上である必要があります')
  .max(16, 'パスワードは16文字以下である必要があります');

const emailSchema = z.string()
  .min(1, 'Eメールアドレスの入力は必須です')
  .email('有効なEメールアドレスを入力してください')

export const stackSchema = z.object({
  skill: z.string().min(1, 'スキルの選択は必須です'),
  stacked_at: z.date(),
  minutes: z.number().min(1, '積み上げ時間の入力は必須です'),
  title: z.string().min(1, 'タイトルの入力は必須です'),
  description: z.string().optional(),
});

export const introspectionSchema = z.object({
  evaluation: z.number().min(0, '評価の入力は必須です'),
  reason: z.string().min(1, '理由の入力は必須です'),
  keeps: z.array(z.object({
    content: z.string().min(1, 'keepの入力は必須です')
  })).refine(array => array.length > 0, {
    message: "1つ以上は入力が必要です",
  }),
  problems: z.array(z.object({
    content: z.string().min(1, 'problemの入力は必須です')
  })).refine(array => array.length > 0, {
    message: "1つ以上は入力が必要です",
  }),
  tries: z.array(z.object({
    content: z.string().min(1, 'tryの入力は必須です')
  })).refine(array => array.length > 0, {
    message: "1つ以上は入力が必要です",
  }),
});

export const teamSchema = z.object({
  name: z.string().min(1, 'チーム名の入力は必須です'),
});

export const inviteTeamSchema = z.object({
  email: emailSchema,
});

export const userSchema = z.object({
  role: z.string().min(1, '権限の選択は必須です'),
  name: z.string().min(1, 'ユーザー名の選択は必須です'),
  email: emailSchema,
  profile_content: z.string().optional(),
  team: z.object({
    name: z.string().min(1, 'チームの選択は必須です')
  }),
});

export const userRegisterSchema = z.object({
  role: z.string().min(1, '権限の選択は必須です'),
  name: z.string().min(1, 'ユーザー名の選択は必須です'),
  email: emailSchema,
  profile_content: z.string().optional(),
  team: z.object({
    name: z.string().min(1, 'チームの選択は必須です')
  }),
  password: passwordSchema,
  password_confirmation: passwordSchema,
}).refine(data => data.password === data.password_confirmation, {
  message: "パスワードとパスワード確認が一致しません",
  path: ["password_confirmation"],
});

export const outputSchema = z.object({
  content: z.string().min(1, 'アウトプット内容の入力は必須です'),
});

export const outputCommentSchema = z.object({
  content: z.string().min(1, 'アウトプット内容の入力は必須です'),
});
