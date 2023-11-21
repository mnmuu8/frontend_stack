import React, { createContext, useState } from 'react';
import { ChildrenProps } from '@/types/utils';
import { IntrospectionProps } from '@/types/introspection';
import {
  StackFormDataParams,
  TeamFormDataParams,
  UserFormDataParams,
  IntrospectionFormDataParams,
  OutputFormDataParams,
  OutputCommentFormDataParams,
} from '@/types/form';
import { FormDataContextProps } from '@/types/context';
import {
  InitialStackFormData,
  InitialIntrospectionFormData,
  InitialTeamFormData,
  InitialUserFormData,
  InitialOutputFormData,
  InitialOutputCommentFormData,
} from '@/utiliry/form';

const InitialState: FormDataContextProps = {
  teamFormData: InitialTeamFormData,
  setTeamFormData: () => {},
  userFormData: InitialUserFormData,
  setUserFormData: () => {},
  stackFormData: InitialStackFormData,
  setStackFormData: () => {},
  introspectionFormData: InitialIntrospectionFormData,
  setIntrospectionFormData: () => {},
  showStackIntrospection: undefined,
  setShowStackIntrospection: () => {},
  outputFormData: InitialOutputFormData,
  setOutputFormData: () => {},
  outputCommentFormData: InitialOutputCommentFormData,
  setOutputCommentFormData: () => {},
};

const FormDataContext = createContext<FormDataContextProps>(InitialState);

const FormDataProvider = ({ children }: ChildrenProps) => {
  const [introspectionFormData, setIntrospectionFormData] =
    useState<IntrospectionFormDataParams>(InitialIntrospectionFormData);
  const [teamFormData, setTeamFormData] = useState<TeamFormDataParams>(InitialTeamFormData);
  const [userFormData, setUserFormData] = useState<UserFormDataParams>(InitialUserFormData);
  const [stackFormData, setStackFormData] = useState<StackFormDataParams>(InitialStackFormData);
  const [showStackIntrospection, setShowStackIntrospection] = useState<IntrospectionProps | undefined>(undefined);
  const [outputFormData, setOutputFormData] = useState<OutputFormDataParams>(InitialOutputFormData);
  const [outputCommentFormData, setOutputCommentFormData] =
    useState<OutputCommentFormDataParams>(InitialOutputCommentFormData);

  return (
    <FormDataContext.Provider
      value={{
        teamFormData: teamFormData,
        setTeamFormData: setTeamFormData,
        userFormData: userFormData,
        setUserFormData: setUserFormData,
        stackFormData: stackFormData,
        setStackFormData: setStackFormData,
        introspectionFormData: introspectionFormData,
        setIntrospectionFormData: setIntrospectionFormData,
        showStackIntrospection: showStackIntrospection,
        setShowStackIntrospection: setShowStackIntrospection,
        outputFormData: outputFormData,
        setOutputFormData: setOutputFormData,
        outputCommentFormData: outputCommentFormData,
        setOutputCommentFormData: setOutputCommentFormData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export { FormDataProvider, FormDataContext };
