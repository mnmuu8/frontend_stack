import { Dispatch, SetStateAction } from "react";
import { TeamFormDataParams } from "@/features/teams/types/context";

export type UserFormDataParams = {
  role: string;
  name: string;
  email: string;
  profile_content: string;
  password?: string;
  password_confirmation?: string;
  team: TeamFormDataParams;
};

export type UserFormContextProps = {
  userFormData: UserFormDataParams;
  setUserFormData: Dispatch<SetStateAction<UserFormDataParams>>;
};
