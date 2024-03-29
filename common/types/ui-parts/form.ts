import { Dispatch, SetStateAction } from 'react';

export type FormType =
  | 'updateUser'
  | 'createStack'
  | 'updateStack'
  | 'createStackIntrospection'
  | 'showStackIntrospection'
  | 'updateStackIntrospection'
  | 'createTeam'
  | 'inviteTeam'
  | 'updateTeam'
  | 'createOutput'
  | 'createOutputComment';

export type ResetFormValueProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  setIsRegisterEvent: Dispatch<SetStateAction<boolean>>;
};
