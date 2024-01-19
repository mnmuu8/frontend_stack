import { ResetFormValueProps } from "../types/ui-parts/form"

export const dataConfirmAlert = (message: string) => {
  return window.confirm(message);
}

export const resetFormValue = ({setFormOpen, setIsRegisterEvent}: ResetFormValueProps) => {
  setFormOpen(false);
  setIsRegisterEvent(true);
}
