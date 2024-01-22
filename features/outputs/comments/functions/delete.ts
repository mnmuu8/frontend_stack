import axios from "axios";
import { getApiHeaders } from "@/common/functions/api";

export const callDeleteOutputComment = async (outputId: number, commentId: number) => {
  const url = `${process.env.API_ROOT_URL}/api/v1/outputs/${outputId}/comments/${commentId}`;
  const options = getApiHeaders();
  try {
    const response = await axios.delete(url, options);
    return response.data;
  } catch (error) {
    throw new Error(`${JSON.stringify(error)}`);
  }
};
