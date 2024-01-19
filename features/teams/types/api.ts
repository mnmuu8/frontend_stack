import { ApiOptions } from "@/common/types/api";
import { SetErrorMessages } from "@/common/types/validator";
import { InviteTeamFormDataParams, TeamFormDataParams } from "@/common/types/form";

export type TeamApiProps = SetErrorMessages & {
  options: ApiOptions;
  teamFormData: TeamFormDataParams;
}

export type callCreateTeamProps = TeamApiProps;
export type callUpdateTeamProps = TeamApiProps;

export type callInviteTeamProps = SetErrorMessages & {
  options: ApiOptions;
  inviteTeamFormData: InviteTeamFormDataParams;
}
