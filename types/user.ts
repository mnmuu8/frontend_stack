import { sessionUser } from "./session";

export type UserProfileProps = {
  user: sessionUser;
  height: number;
  width: number;
  isHeader: boolean;
  created_at?: string;
}
