import React, { FC, useContext, useState } from 'react';
import StackFormGroup from '@/features/stacks/components/StackFormGroup';
import { getSession } from '@/features/sessions/functions/session';
import { NextRouter, useRouter } from 'next/router';
import { FormContext } from '@/context/FormContext';
import { resetFormValue } from '@/common/functions/form';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';
import { StackFormContext } from '@/features/stacks/contexts/StackFormContext';
import { callCreateStack } from '../functions/api';
import { InitialStackFormData } from '../functions/form';
import { ErrorMessages } from '@/common/types/validator';

const StackForm: FC = () => {
  const { stackFormData, setStackFormData } = useContext(StackFormContext);
  const { setFormOpen, setIsRegisterEvent, setIsValidate } = useContext(FormContext);
  const [ errorMessages, setErrorMessages ] = useState<ErrorMessages>({});

  const router: NextRouter = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setStackFormData(InitialStackFormData)
  };

  const FormSubmit = async () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();
    
    if (!dataConfirmAlert('積み上げを作成しますか？')) return;
    await callCreateStack({ options, sessionData, stackFormData, setErrorMessages })
      .then(() => {
        resetFormValue({
          setFormOpen,
          setIsRegisterEvent,
          setIsValidate,
        });
        setStackFormData(InitialStackFormData);

        router.push('/timeline');
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <div className='flex-1'>
        <div className='FormHeading'>積み上げを作成</div>
        <div className='FormFieldGroup'>
          <StackFormGroup errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
        </div>
      </div>
      <div className='FormBtnGroup'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} disabled={false} label={'作成'} />
      </div>
    </>
  );
};

export default StackForm;
