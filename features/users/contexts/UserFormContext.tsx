import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/common/types/utils';
import { UserFormDataParams } from '@/common/types/form';
import { InitialUserFormData } from '@/common/functions/form';
import { UserFormContextProps } from '../types/context';

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
