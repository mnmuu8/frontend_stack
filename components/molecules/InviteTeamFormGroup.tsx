import React, { FC, useContext, useState, useEffect } from 'react';
import TextInput from './TextInput';
import { FormDataContext } from '@/context/FormDataContext';

import { hasValidationErrors, inviteTeamValidationRules } from '@/utiliry/validator';
import { ErrorMessages } from '@/types/validator';
import ErrorMessage from '../atoms/ErrorMessage';
import { FormContext } from '@/context/FormContext';
import { InitialTeamErrorMessage, validationCheck } from '@/utiliry/form';

const InviteTeamFormGroup: FC = () => {
  const formDataContext = useContext(FormDataContext);
  const { inviteTeamFormData, setInviteTeamFormData } = formDataContext;

  const formContext = useContext(FormContext);
  const { setIsValidate } = formContext;

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(InitialTeamErrorMessage);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validationRules = inviteTeamValidationRules;
    validationCheck({ name, value, validationRules, errorMessages, setErrorMessages });

    setInviteTeamFormData({
      ...inviteTeamFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    setIsValidate(!hasValidationErrors(inviteTeamFormData));
  }, [inviteTeamFormData]);

  return (
    <>
      <TextInput
        name={'email'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'メールアドレス'}
        placeholder={'招待するメンバーのメールアドレスを入力してください'}
        type='text'
        onChange={handleFieldChange}
        value={inviteTeamFormData.email}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'email'} />
    </>
  );
};

export default InviteTeamFormGroup;
