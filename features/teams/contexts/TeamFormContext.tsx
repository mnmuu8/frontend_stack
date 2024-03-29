import React, { createContext, useState, useMemo } from 'react';
import { InitialTeamFormData } from '../functions/form';
import { TeamFormContextProps, TeamFormDataParams } from '../types/context';
import { ChildrenProps } from '@/common/types/ui-parts/layout';

const InitialState: TeamFormContextProps = {
  teamFormData: InitialTeamFormData,
  setTeamFormData: () => {},
};

const TeamFormContext = createContext<TeamFormContextProps>(InitialState);

const TeamFormProvider = ({ children }: ChildrenProps) => {
  const [teamFormData, setTeamFormData] = useState<TeamFormDataParams>(InitialTeamFormData);

  const providerValue = useMemo(() => ({
    teamFormData,
    setTeamFormData,
  }), [teamFormData]);

  return <TeamFormContext.Provider value={providerValue}>{children}</TeamFormContext.Provider>;
};

export { TeamFormProvider, TeamFormContext };
