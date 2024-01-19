import React, { createContext, useState, useMemo } from 'react';
import { StackFormDataParams } from '../types/context';
import { InitialStackFormData } from '../functions/form';
import { StackFormContextProps } from '../types/context';
import { ChildrenProps } from '@/common/types/ui-parts/layout';

const InitialState: StackFormContextProps = {
  stackFormData: InitialStackFormData,
  setStackFormData: () => {},
};

const StackFormContext = createContext<StackFormContextProps>(InitialState);

const StackFormProvider = ({ children }: ChildrenProps) => {
  const [stackFormData, setStackFormData] = useState<StackFormDataParams>(InitialStackFormData);

  const providerValue = useMemo(() => ({
    stackFormData,
    setStackFormData,
  }),[stackFormData]);

  return <StackFormContext.Provider value={providerValue}>{children}</StackFormContext.Provider>;
};

export { StackFormProvider, StackFormContext };
