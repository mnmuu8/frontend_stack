import { Dispatch, SetStateAction } from "react";

export type TeamFormDataParams = {
  id?: number;
  name: string;
};

export type InviteTeamFormDataParams = {
  id: number;
  email: string;
};

export type TeamFormContextProps = {
  teamFormData: TeamFormDataParams;
  setTeamFormData: Dispatch<SetStateAction<TeamFormDataParams>>;
};

export type InviteTeamFormContextProps = {
  inviteTeamFormData: InviteTeamFormDataParams;
  setInviteTeamFormData: Dispatch<SetStateAction<InviteTeamFormDataParams>>;
};
