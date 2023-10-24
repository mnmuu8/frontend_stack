import { TeamProps } from "./team";

export type sessionUser = {
  id: number;
  name: string;
  email: string;
  profile_content: string;
  created_at: string;
  updated_at: string;
  team: TeamProps
} | undefined
