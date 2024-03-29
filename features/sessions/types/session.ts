import { TeamProps } from "@/features/teams/types/team";

export type SessionUser =
  | {
      id: number;
      role: string;
      name: string;
      email: string;
      profile_content: string;
      profile_image_path: string | null;
      created_at: string;
      updated_at: string;
      team: TeamProps;
    }
  | undefined;

export type SessionData = {
  token: string;
  userId: number;
  exp: number;
  lastActivity: number;
  role: string;
};
