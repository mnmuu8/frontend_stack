import axios from "axios";
import { z } from 'zod';
import { outputSchema } from "@/common/functions/validator";
import { createOutputApiProps } from "@/common/types/api";
import { ErrorMessages } from "@/common/types/validator";

export const callCreateOutput = async ({options, outputFormData, setErrorMessages}: createOutputApiProps) => {
  try {
    outputSchema.parse(outputFormData);

    const params = {
      content: outputFormData.content,
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/outputs`;
    await axios.post(url, params, options);
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
