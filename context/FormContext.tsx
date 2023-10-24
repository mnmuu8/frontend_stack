import React, { createContext, useState } from "react";
import { ChildrenProps } from "@/types/utils";
import { FormType } from "@/types/form";
import { FormContextProps } from "@/types/context";

const InitialState: FormContextProps = {
  formType: 'createStack',
  setFormType: () => {},
  formOpen: false,
  setFormOpen: () => {},
  isRegisterEvent: false,
  setIsRegisterEvent: () => {},
}

const FormContext = createContext<FormContextProps>(InitialState);

const FormProvider = ({ children }: ChildrenProps) => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<FormType>('createStack');
  const [isRegisterEvent, setIsRegisterEvent] = useState<boolean>(false);

  return (
    <FormContext.Provider 
      value={{
        formType: formType,
        setFormType: setFormType,
        formOpen: formOpen,
        setFormOpen: setFormOpen,
        isRegisterEvent: isRegisterEvent,
        setIsRegisterEvent: setIsRegisterEvent,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export { FormProvider, FormContext }