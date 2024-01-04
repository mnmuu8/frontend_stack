import { callStackApiProps } from "@/common/types/api";
import axios from "axios";

export const callCreateStack = ({options, sessionData, stackFormData, router}: callStackApiProps) => {
  const createStack = async () => {
    const params = {
      title: stackFormData.title,
      description: stackFormData.description,
      minutes: stackFormData.minutes,
      skill_id: stackFormData.skill,
      stacked_at: stackFormData.stacked_at,
      user_id: sessionData.userId
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks`;
    try {
      const response = await axios.post(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  createStack().then(res => router.push('/timeline'));
}
