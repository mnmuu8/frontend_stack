import { ResetFormValueProps } from "../types/form"

export const dataConfirmAlert = (message: string) => {
  return window.confirm(message);
}

export const resetFormValue = ({setFormOpen, setIsRegisterEvent, setIsValidate}: ResetFormValueProps) => {
  setFormOpen(false);
  setIsRegisterEvent(false)
  setIsValidate(true)
}
