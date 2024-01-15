import axios from "axios";
import { getApiHeaders } from '@/common/functions/api';

export const fetchDeleteTeam = async (teamId: number) => {
  const url = `${process.env.API_ROOT_URL}/api/v1/teams/${teamId}`;
  const options = getApiHeaders();
  try {
    const response = await axios.delete(url, options);
    return response.data;
  } catch (error) {
    throw new Error(`${JSON.stringify(error)}`);
  }
};
