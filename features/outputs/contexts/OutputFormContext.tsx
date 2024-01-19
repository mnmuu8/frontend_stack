import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/common/types/utils';
import { InitialOutputFormData } from '../functions/form';
import { OutputFormContextProps, OutputFormDataParams } from '../types/context';

const InitialState: OutputFormContextProps = {
  outputFormData: InitialOutputFormData,
  setOutputFormData: () => {},
};

const OutputFormContext = createContext<OutputFormContextProps>(InitialState);

const OutputFormProvider = ({ children }: ChildrenProps) => {
  const [outputFormData, setOutputFormData] = useState<OutputFormDataParams>(InitialOutputFormData);

  const providerValue = useMemo(() => ({
    outputFormData,
    setOutputFormData,
  }), [outputFormData]);

  return <OutputFormContext.Provider value={providerValue}>{children}</OutputFormContext.Provider>;
};

export { OutputFormProvider, OutputFormContext };
