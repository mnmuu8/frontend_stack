import {
  IntrospectionFormDataParams,
  OutputFormDataParams,
  TeamFormDataParams,
  InviteTeamFormDataParams,
  UserFormDataParams,
  OutputCommentFormDataParams,
} from './form';
import { SessionData, sessionUser } from '@/features/sessions/types/session';
import { StackRankings } from '@/features/skills/components/RankTable';
import { SetErrorMessages } from './validator';

export type SessionDataProps = {
  sessionData: SessionData;
};

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

export type createIntrospectionApiProps = ApiOptionsProps & SetErrorMessages & {
  introspectionFormData: IntrospectionFormDataParams;
};

export type createUserApiProps = ApiOptionsProps & SetErrorMessages & {
  userFormData: UserFormDataParams;
};

export type callUserApiProps = ApiOptionsProps & SessionDataProps & SetErrorMessages & {
  userFormData: UserFormDataParams;
};

export type createTeamApiProps = ApiOptionsProps & SetErrorMessages & {
  teamFormData: TeamFormDataParams;
};

export type inviteTeamApiProps = ApiOptionsProps & SetErrorMessages & {
  inviteTeamFormData: InviteTeamFormDataParams;
};

export type createOutputApiProps = ApiOptionsProps & SetErrorMessages & {
  outputFormData: OutputFormDataParams;
};

export type createOutputCommentApiProps = ApiOptionsProps & SessionDataProps & SetErrorMessages & {
  outputCommentFormData: OutputCommentFormDataParams;
};

export type fetchStackRankingsProps = ApiOptionsProps &
  SessionUserProps & {
    setStackRankings: React.Dispatch<React.SetStateAction<StackRankings[]>>;
  };
