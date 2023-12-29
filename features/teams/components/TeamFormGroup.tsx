import React, { FC, useContext, useState, useEffect } from 'react';
import TextInput from '@/components/ui-elements/TextInput';

import { hasValidationErrors, teamValidationRules } from '@/common/functions/validator';
import { ErrorMessages } from '@/common/types/validator';
import ErrorMessage from '@/components/ui-elements/ErrorMessage';
import { FormContext } from '@/context/FormContext';
import { InitialTeamErrorMessage, validationCheck } from '@/common/functions/form';
import { TeamFormContext } from '../contexts/TeamFormContext';

const TeamFormGroup: FC = () => {
  const { teamFormData, setTeamFormData } = useContext(TeamFormContext);

  const formContext = useContext(FormContext);
  const { setIsValidate } = formContext;

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(InitialTeamErrorMessage);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validationRules = teamValidationRules;
    validationCheck({ name, value, validationRules, errorMessages, setErrorMessages });

    setTeamFormData({
      ...teamFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    setIsValidate(!hasValidationErrors(teamFormData));
  }, [teamFormData]);

  return (
    <>
      <TextInput
        name={'name'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'チーム名'}
        placeholder={'エンジニア第７世代'}
        type='text'
        onChange={handleFieldChange}
        value={teamFormData.name}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'name'} />
    </>
  );
};

export default TeamFormGroup;
