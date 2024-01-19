import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/common/types/utils';
import { InitialIntrospectionFormData } from '../functions/form';
import { IntrospectionFormContextProps, IntrospectionFormDataParams } from '../types/context';

const InitialState: IntrospectionFormContextProps = {
  introspectionFormData: InitialIntrospectionFormData,
  setIntrospectionFormData: () => {},
};

const IntrospectionFormContext = createContext<IntrospectionFormContextProps>(InitialState);

const IntrospectionFormProvider = ({ children }: ChildrenProps) => {
  const [introspectionFormData, setIntrospectionFormData] = useState<IntrospectionFormDataParams>(InitialIntrospectionFormData);

  const providerValue = useMemo(() => ({
    introspectionFormData,
    setIntrospectionFormData,
  }),[introspectionFormData]);

  return <IntrospectionFormContext.Provider value={providerValue}>{children}</IntrospectionFormContext.Provider>;
};

export { IntrospectionFormProvider, IntrospectionFormContext };
