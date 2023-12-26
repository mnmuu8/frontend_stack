import React, { FC, useContext, useEffect, useState } from 'react';

import DateInput from './DateInput';
import TextInput from '@/components/ui-elements/TextInput';
import SkillInput from '@/features/skills/components/SkillInput';
import { FormDataContext } from '@/context/FormDataContext';
import { FormContext } from '@/context/FormContext';

import { hasValidationErrors, stackValidationRules } from '@/common/functions/validator';
import { ErrorMessages } from '@/common/types/validator';
import ErrorMessage from '@/components/ui-elements/ErrorMessage';
import { InitialStackErrorMessage, validationCheck  } from '@/common/functions/form';

const StackFormGroup: FC = () => {
  const formDataContext = useContext(FormDataContext);
  const { stackFormData, setStackFormData } = formDataContext;

  const formContext = useContext(FormContext);
  const { setIsValidate } = formContext;

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(InitialStackErrorMessage);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validationRules = stackValidationRules;
    validationCheck({ name, value, validationRules, errorMessages, setErrorMessages });

    setStackFormData({
      ...stackFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    setIsValidate(!hasValidationErrors(stackFormData));
  }, [stackFormData]);

  return (
    <>
      <SkillInput />
      <ErrorMessage errorMessages={errorMessages} errorKey={'skill'} />
      <div className='flex'>
        <DateInput errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
        <div>
          <TextInput
            name={'minutes'}
            fullWidth={true}
            multiline={false}
            minRows={1}
            required={true}
            requiredMessage={'必須入力'}
            label={'積み上げ時間'}
            placeholder={'8'}
            type='number'
            value={stackFormData.minutes}
            onChange={handleFieldChange}
          />
          <ErrorMessage errorMessages={errorMessages} errorKey={'minutes'} />
        </div>
      </div>
      <TextInput
        name={'title'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'タイトル'}
        placeholder={'Reactの学習...'}
        type='text'
        value={stackFormData.title}
        onChange={handleFieldChange}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'title'} />
      <TextInput
        name={'description'}
        fullWidth={true}
        multiline={true}
        minRows={5}
        required={true}
        requiredMessage={'必須入力'}
        label={'積み上げ内容'}
        placeholder={'ReactHooksを学習しました。useStateについて...'}
        type='text'
        value={stackFormData.description}
        onChange={handleFieldChange}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'description'} />
    </>
  );
};

export default StackFormGroup;
