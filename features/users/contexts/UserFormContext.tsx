import React, { createContext, useState, useMemo } from 'react';
import { InitialUserFormData } from '../functions/form';
import { UserFormContextProps, UserFormDataParams } from '../types/context';
import { ChildrenProps } from '@/common/types/ui-parts/layout';

const InitialState: UserFormContextProps = {
  userFormData: InitialUserFormData,
  setUserFormData: () => {},
};

const UserFormContext = createContext<UserFormContextProps>(InitialState);

const UserFormProvider = ({ children }: ChildrenProps) => {
  const [userFormData, setUserFormData] = useState<UserFormDataParams>(InitialUserFormData);

  const providerValue = useMemo(() => ({
    userFormData,
    setUserFormData,
  }),[userFormData]);

  return <UserFormContext.Provider value={providerValue}>{children}</UserFormContext.Provider>;
};

export { UserFormProvider, UserFormContext };
