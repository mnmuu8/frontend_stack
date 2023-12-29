import { InviteTeamFormDataParams, TeamFormDataParams } from "@/common/types/form";
import { Dispatch, SetStateAction } from "react";

export type TeamFormContextProps = {
  teamFormData: TeamFormDataParams;
  setTeamFormData: Dispatch<SetStateAction<TeamFormDataParams>>;
};

export type InviteTeamFormContextProps = {
  inviteTeamFormData: InviteTeamFormDataParams;
  setInviteTeamFormData: Dispatch<SetStateAction<InviteTeamFormDataParams>>;
};