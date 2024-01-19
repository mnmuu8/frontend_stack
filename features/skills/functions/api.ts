import axios from "axios";
import { FetchStackRankingsProps } from "../types/api";

export const callFetchStackRankings = ({options, sessionUser ,setStackRankings}: FetchStackRankingsProps) => {
  const fetchStackRanking = async () => {
    if (!sessionUser) return;

    const teamId = sessionUser.team.id
    const url = `${process.env.API_ROOT_URL}/api/v1/teams/${teamId}/stack_ranking`;
  
    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  }
  if (sessionUser) {
    fetchStackRanking().then(res => {
      setStackRankings(res.stack_rankings);
    });
  }
}