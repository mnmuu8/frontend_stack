import { ResetFormValueProps } from "@/types/form"
import { validationCheckProps } from "@/types/validator"

export const InitialStackFormData = {skill: "", stacked_at: new Date(), minutes: 0, title: "", description: ""}
export const InitialIntrospectionFormData = {evaluation: 0, reason: "", keeps: [], problems: [], tries: []}
export const InitialUserFormData = {role: "", name: "", email: "", profile_content: "", team: {name: ""}}
export const InitialTeamFormData = {name: ""}
export const InitialOutputFormData = {content: ""}

export const InitialStackErrorMessage = {skill: '', stacked_at: '', minutes: '', title: '', description: ''}
export const InitialIntrospectionErrorMessage = {reason: '', evaluation: '', keeps: '', problems: '', tries: ''}
export const InitialUserErrorMessage = {role: '',name: '',email: '',profile_content: '',team: ''}
export const InitialTeamErrorMessage = {name: ''}
export const InitialOutputErrorMessage = {content: ""}

export const dataConfirmAlert = (message: string) => {
  return window.confirm(message);
}

export const resetFormValue = ({setFormOpen, setIsRegisterEvent, setIsValidate, setStackFormData, setIntrospectionFormData, setUserFormData, setTeamFormData, setShowStackIntrospection, setOutputFormData}: ResetFormValueProps): void => {
  setFormOpen(false);

  setIsRegisterEvent(false)
  setIsValidate(true)

  setStackFormData(InitialStackFormData)
  setIntrospectionFormData(InitialIntrospectionFormData)
  setUserFormData(InitialUserFormData)
  setTeamFormData(InitialTeamFormData)
  setOutputFormData(InitialOutputFormData)

  setShowStackIntrospection(undefined);
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