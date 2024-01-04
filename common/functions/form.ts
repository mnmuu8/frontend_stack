import { ResetFormValueProps } from "../types/form"
import { validationCheckProps } from "../types/validator"

export const dataConfirmAlert = (message: string) => {
  return window.confirm(message);
}

export const resetFormValue = ({setFormOpen, setIsRegisterEvent, setIsValidate}: ResetFormValueProps) => {
  setFormOpen(false);
  setIsRegisterEvent(false)
  setIsValidate(true)
}

export const validationCheck = ({name, value, validationRules, errorMessages, setErrorMessages}: validationCheckProps) => {
  const isTargetField = validationRules[name];
  if (isTargetField) {
    const isValid = isTargetField(value);
    setErrorMessages({
      ...errorMessages,
      [name]: isValid ? '' : '必須項目です',
    });
  }
}
