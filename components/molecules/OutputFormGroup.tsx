import React, { FC, useContext, useState, useEffect } from 'react';
import TextInput from './TextInput';
import { FormDataContext } from '@/context/FormDataContext';

import { hasValidationErrors, outputValidationRules } from '@/utiliry/validator';
import { ErrorMessages } from '@/types/validator';
import ErrorMessage from '../atoms/ErrorMessage';
import { FormContext } from '@/context/FormContext';
import { InitialOutputErrorMessage, validationCheck } from '@/utiliry/form';
import RichTextEditor from './RichTextEditor';

const OutputFormGroup: FC = () => {
  const formDataContext = useContext(FormDataContext);
  const { outputFormData, setOutputFormData } = formDataContext;

  const formContext = useContext(FormContext);
  const { setIsValidate } = formContext;

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(InitialOutputErrorMessage);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validationRules = outputValidationRules;
    validationCheck({ name, value, validationRules, errorMessages, setErrorMessages });

    setOutputFormData({
      ...outputFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    setIsValidate(!hasValidationErrors(outputFormData));
  }, [outputFormData]);

  return (
    <>
      <div className='hidden'>
        <TextInput
          name={'content'}
          fullWidth={true}
          multiline={true}
          minRows={1}
          required={true}
          requiredMessage={'必須入力'}
          label={'内容'}
          placeholder={'ChatGPTの便利な使い方を紹介...'}
          type='text'
          onChange={handleFieldChange}
          value={outputFormData.content}
        />
      </div>
      <RichTextEditor />
      <ErrorMessage errorMessages={errorMessages} errorKey={'content'} />
    </>
  );
};

export default OutputFormGroup;
