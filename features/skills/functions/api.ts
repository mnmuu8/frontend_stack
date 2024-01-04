import { fetchStackRankingsProps } from "@/common/types/api";
import axios from "axios";

export const callFetchStackRankings = ({options, sessionUser ,setStackRankings}: fetchStackRankingsProps) => {
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