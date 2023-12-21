import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/types/utils';
import { FormType } from '@/types/form';
import { FormContextProps } from '@/types/context';

const InitialState: FormContextProps = {
  formType: 'createStack',
  setFormType: () => {},
  formOpen: false,
  setFormOpen: () => {},
  isRegisterEvent: false,
  setIsRegisterEvent: () => {},
  isValidate: true,
  setIsValidate: () => {},
};

const FormContext = createContext<FormContextProps>(InitialState);

const FormProvider = ({ children }: ChildrenProps) => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<FormType>('createStack');
  const [isRegisterEvent, setIsRegisterEvent] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(true);

  const providerValue = useMemo(
    () => ({
      formType,
      setFormType,
      formOpen,
      setFormOpen,
      isRegisterEvent,
      setIsRegisterEvent,
      isValidate,
      setIsValidate,
    }),
    [formType, formOpen, isRegisterEvent, isValidate],
  );

  return <FormContext.Provider value={providerValue}>{children}</FormContext.Provider>;
};

export { FormProvider, FormContext };
