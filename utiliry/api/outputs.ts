import { createOutputApiProps } from "@/types/api";
import axios from "axios";

export const callCreateOutput = ({options, outputFormData, setIsRegisterEvent, router}: createOutputApiProps) => {
  const createOutput = async () => {
    const params = {
      content: outputFormData.content,
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/outputs`;
  
    try {
      const response = await axios.post(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };
  
  createOutput().then(res => {
    setIsRegisterEvent(true);
    router.push('/outputs');
  });
}