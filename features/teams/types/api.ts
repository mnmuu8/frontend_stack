import { ApiOptions } from "@/common/types/api";
import { SetErrorMessages } from "@/common/types/validator";
import { InviteTeamFormDataParams, TeamFormDataParams } from "@/common/types/form";

export type TeamApiProps = SetErrorMessages & {
  options: ApiOptions;
  teamFormData: TeamFormDataParams;
}

export type CreateTeamProps = TeamApiProps;
export type UpdateTeamProps = TeamApiProps;

export type InviteTeamProps = SetErrorMessages & {
  options: ApiOptions;
  inviteTeamFormData: InviteTeamFormDataParams;
}
