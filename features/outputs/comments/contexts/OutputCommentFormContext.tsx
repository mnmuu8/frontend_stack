import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/common/types/utils';
import { InitialOutputCommentFormData } from '../../functions/form';
import { OutputCommentFormContextProps, OutputCommentFormDataParams } from '../types/context';

const InitialState: OutputCommentFormContextProps = {
  outputCommentFormData: InitialOutputCommentFormData,
  setOutputCommentFormData: () => {},
};

const OutputCommentFormContext = createContext<OutputCommentFormContextProps>(InitialState);

const OutputCommentFormProvider = ({ children }: ChildrenProps) => {
  const [outputCommentFormData, setOutputCommentFormData] = useState<OutputCommentFormDataParams>(InitialOutputCommentFormData);

  const providerValue = useMemo(() => ({
    outputCommentFormData,
    setOutputCommentFormData,
  }),[outputCommentFormData]);

  return <OutputCommentFormContext.Provider value={providerValue}>{children}</OutputCommentFormContext.Provider>;
};

export { OutputCommentFormProvider, OutputCommentFormContext };
