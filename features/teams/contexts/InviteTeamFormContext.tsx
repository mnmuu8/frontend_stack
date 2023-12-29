import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/common/types/utils';
import { InviteTeamFormDataParams } from '@/common/types/form';
import { InitialInviteTeamFormData } from '@/common/functions/form';
import { InviteTeamFormContextProps } from '../types/context';

const InitialState: InviteTeamFormContextProps = {
  inviteTeamFormData: InitialInviteTeamFormData,
  setInviteTeamFormData: () => {},
};

const InviteTeamFormContext = createContext<InviteTeamFormContextProps>(InitialState);

const InviteTeamFormProvider = ({ children }: ChildrenProps) => {
  const [inviteTeamFormData, setInviteTeamFormData] = useState<InviteTeamFormDataParams>(InitialInviteTeamFormData);

  const providerValue = useMemo(() => ({
    inviteTeamFormData,
    setInviteTeamFormData,
  }), [inviteTeamFormData]);

  return <InviteTeamFormContext.Provider value={providerValue}>{children}</InviteTeamFormContext.Provider>;
};

export { InviteTeamFormProvider, InviteTeamFormContext };
