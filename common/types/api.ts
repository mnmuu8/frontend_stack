import { Dispatch, SetStateAction } from 'react';
import {
  IntrospectionFormDataParams,
  OutputFormDataParams,
  StackFormDataParams,
  TeamFormDataParams,
  InviteTeamFormDataParams,
  UserFormDataParams,
  OutputCommentFormDataParams,
} from './form';
import { SessionData, sessionUser } from '@/features/sessions/types/session';
import { NextRouter } from 'next/router';
import { StackRankings } from '@/features/skills/components/RankTable';
import { OutputProps } from '@/features/outputs/types/output';
import { SetErrorMessages } from './validator';

export type routerProps = {
  router: NextRouter;
};

export type SessionDataProps = {
  sessionData: SessionData;
};

export type SessionUserProps = {
  sessionUser: sessionUser;
};

export type setIsRegisterEventProps = {
  setIsRegisterEvent: Dispatch<SetStateAction<boolean>>;
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

export type callStackApiProps = ApiOptionsProps & SessionDataProps & SetErrorMessages & {
  stackFormData: StackFormDataParams
};

export type createIntrospectionApiProps = ApiOptionsProps & SetErrorMessages & {
  introspectionFormData: IntrospectionFormDataParams;
};

export type createUserApiProps = ApiOptionsProps &
  routerProps & {
    userFormData: UserFormDataParams;
  };

export type callUserApiProps = ApiOptionsProps &
  routerProps &
  SessionDataProps & {
    userFormData: UserFormDataParams;
  };

export type createTeamApiProps = ApiOptionsProps & SetErrorMessages & {
  teamFormData: TeamFormDataParams;
};

export type inviteTeamApiProps = ApiOptionsProps & SetErrorMessages & {
  inviteTeamFormData: InviteTeamFormDataParams;
};

export type createOutputApiProps = ApiOptionsProps &
  routerProps &
  setIsRegisterEventProps & {
    outputFormData: OutputFormDataParams;
  };

export type createOutputCommentApiProps = ApiOptionsProps &
  routerProps & {
    outputCommentFormData: OutputCommentFormDataParams;
  };

export type fetchStackRankingsProps = ApiOptionsProps &
  SessionUserProps & {
    setStackRankings: React.Dispatch<React.SetStateAction<StackRankings[]>>;
  };

export type getOutputsApiProps = ApiOptionsProps & {
  setOutputs: Dispatch<SetStateAction<OutputProps[]>>;
};
