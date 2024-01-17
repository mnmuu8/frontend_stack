import axios from "axios";
import { z } from 'zod';
import { outputCommentSchema } from "@/common/functions/validator";
import { createOutputCommentApiProps } from "@/common/types/api";

export const callCreateOutputComment = async ({options, sessionData, outputCommentFormData, setErrorMessages}: createOutputCommentApiProps) => {
  const outputId = outputCommentFormData.outputId;

  try {
    outputCommentSchema.parse(outputCommentFormData);
  
    const params = {
      content: outputCommentFormData.content,
      user_id: sessionData.userId
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/outputs/${outputId}/comments`;
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
