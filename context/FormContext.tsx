import React, { createContext, useState } from 'react';
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

  return (
    <FormContext.Provider
      value={{
        formType: formType,
        setFormType: setFormType,
        formOpen: formOpen,
        setFormOpen: setFormOpen,
        isRegisterEvent: isRegisterEvent,
        setIsRegisterEvent: setIsRegisterEvent,
        isValidate: isValidate,
        setIsValidate: setIsValidate,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
