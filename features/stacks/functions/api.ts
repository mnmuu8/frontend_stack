import axios from "axios";
import { z } from 'zod';
import { stackSchema } from "@/common/functions/validator";
import { callStackApiProps } from "@/common/types/api";

export const callCreateStack = async ({options, sessionData, stackFormData, setErrorMessages}: callStackApiProps) => {
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
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks`;
    await axios.post(url, params, options);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: any = {};
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
