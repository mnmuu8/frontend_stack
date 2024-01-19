import { sessionUser } from '@/features/sessions/types/session';
import { StackRankings } from '@/features/skills/components/RankTable';

export type SessionUserProps = {
  sessionUser: sessionUser;
};

export type ApiOptions<T extends Record<string, string | number> = {}> = {
  headers: {
    'Content-Type': string;
    Authorization: string;
  };
  params?: T;
};

export type ApiOptionsProps = {
  options: ApiOptions;
};

export type fetchStackRankingsProps = ApiOptionsProps &
  SessionUserProps & {
    setStackRankings: React.Dispatch<React.SetStateAction<StackRankings[]>>;
  };
