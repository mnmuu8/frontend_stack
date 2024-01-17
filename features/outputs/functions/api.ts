import axios from "axios";
import { z } from 'zod';
import { outputSchema } from "@/common/functions/validator";
import { createOutputApiProps, getOutputsApiProps } from "@/common/types/api";

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

export const callGetOutpus = ({options, setOutputs}: getOutputsApiProps) => {
  const getOutputs = async () => {

    const url: string = `${process.env.API_ROOT_URL}/api/v1/outputs`;
  
    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };
  
  getOutputs().then(res => setOutputs(res.outputs));
}
