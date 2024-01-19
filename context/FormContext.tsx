import React, { createContext, useState, useMemo } from 'react';
import { FormType } from '@/common/types/ui-parts/form';
import { FormContextProps } from '@/common/types/context';
import { ChildrenProps } from '@/common/types/ui-parts/layout';

const InitialState: FormContextProps = {
  formType: 'createStack',
  setFormType: () => {},
  formOpen: false,
  setFormOpen: () => {},
  isRegisterEvent: false,
  setIsRegisterEvent: () => {},
};

const FormContext = createContext<FormContextProps>(InitialState);

const FormProvider = ({ children }: ChildrenProps) => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<FormType>('createStack');
  const [isRegisterEvent, setIsRegisterEvent] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      formType,
      setFormType,
      formOpen,
      setFormOpen,
      isRegisterEvent,
      setIsRegisterEvent,
    }),
    [formType, formOpen, isRegisterEvent],
  );

  return <FormContext.Provider value={providerValue}>{children}</FormContext.Provider>;
};

export { FormProvider, FormContext };
