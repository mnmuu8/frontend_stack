import axios from "axios";
import { z } from 'zod';
import { stackSchema } from "@/common/functions/validator";
import { ErrorMessages } from "@/common/types/validator";
import { StackProps } from "../types/api";

export const callUpdateStack = async ({options, sessionData, stackFormData, setErrorMessages}: StackProps) => {
  try {
    stackSchema.parse(stackFormData);

    const params = {
      title: stackFormData.title,
      description: stackFormData.description,
      minutes: stackFormData.minutes,
      skill_id: stackFormData.skill,
      stacked_at: stackFormData.stacked_at,
      user_id: sessionData.userId
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${stackFormData.id}`;
    await axios.patch(url, params, options);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: ErrorMessages = {};
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrorMessages(newErrors);

      throw error;
    } else {
      console.error("APIリクエストエラー:", error);
    }
  }
}
