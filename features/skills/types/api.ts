import { ApiOptions } from "@/common/types/api";
import { StackRankings } from "../components/RankTable";
import { SessionUser } from "@/features/sessions/types/session";

export type FetchStackRankingsProps = {
  options: ApiOptions;
  sessionUser: SessionUser;
  setStackRankings: React.Dispatch<React.SetStateAction<StackRankings[]>>;
}
