import React, { FC, useContext, useState, useEffect } from 'react';
import TextInput from './TextInput';
import { FormDataContext } from '@/context/FormDataContext';

import { hasValidationErrors, outputCommentValidationRules } from '@/utiliry/validator';
import { ErrorMessages } from '@/types/validator';
import ErrorMessage from '../atoms/ErrorMessage';
import { FormContext } from '@/context/FormContext';
import { InitialOutputErrorMessage, validationCheck } from '@/utiliry/form';

const OutputCommentFormGroup: FC = () => {
  const formDataContext = useContext(FormDataContext);
  const { outputCommentFormData, setOutputCommentFormData } = formDataContext;

  const formContext = useContext(FormContext);
  const { setIsValidate } = formContext;

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(InitialOutputErrorMessage);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validationRules = outputCommentValidationRules;
    validationCheck({ name, value, validationRules, errorMessages, setErrorMessages });

    setOutputCommentFormData({
      ...outputCommentFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    setIsValidate(!hasValidationErrors(outputCommentFormData));
  }, [outputCommentFormData]);

  return (
    <>
      <TextInput
        name={'content'}
        fullWidth={true}
        multiline={true}
        minRows={5}
        required={true}
        requiredMessage={'必須入力'}
        label={'コメント'}
        placeholder={'コメントを入力...'}
        type='text'
        onChange={handleFieldChange}
        value={outputCommentFormData.content}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'content'} />
    </>
  );
};

export default OutputCommentFormGroup;
