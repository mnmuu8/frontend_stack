import { ApiOptions } from "@/common/types/api";
import { StackRankings } from "../components/RankTable";
import { sessionUser } from "@/features/sessions/types/session";

export type fetchStackRankingsProps = {
  options: ApiOptions;
  sessionUser: sessionUser;
  setStackRankings: React.Dispatch<React.SetStateAction<StackRankings[]>>;
}