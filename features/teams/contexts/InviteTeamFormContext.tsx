import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/common/types/utils';
import { InitialInviteTeamFormData } from '../functions/form';
import { InviteTeamFormContextProps, InviteTeamFormDataParams } from '../types/context';

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
