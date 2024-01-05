import React, { FC, useContext, useState, useEffect } from 'react';
import TextInput from '@/components/ui-elements/TextInput';

import { hasValidationErrors, inviteTeamValidationRules } from '@/common/functions/validator';
import { ErrorMessages } from '@/common/types/validator';
import ErrorMessage from '@/components/ui-elements/ErrorMessage';
import { FormContext } from '@/context/FormContext';
import { validationCheck } from '@/common/functions/form';
import { InviteTeamFormContext } from '../contexts/InviteTeamFormContext';
import { InitialTeamErrorMessage } from '../functions/form';

const InviteTeamFormGroup: FC = () => {
  const { inviteTeamFormData, setInviteTeamFormData } = useContext(InviteTeamFormContext);

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
