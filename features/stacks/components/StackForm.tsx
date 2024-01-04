import React, { FC, useContext } from 'react';
import StackFormGroup from '@/features/stacks/components/StackFormGroup';
import { getSession } from '@/features/sessions/functions/session';
import { NextRouter, useRouter } from 'next/router';
import { FormContext } from '@/context/FormContext';
import { InitialStackFormData, resetFormValue } from '@/common/functions/form';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';
import { StackFormContext } from '@/features/stacks/contexts/StackFormContext';
import { callCreateStack } from '../functions/api';

const StackForm: FC = () => {
  const { stackFormData, setStackFormData } = useContext(StackFormContext);
  const { setFormOpen, setIsRegisterEvent, isValidate, setIsValidate } = useContext(FormContext);

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

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();
    
    if (!dataConfirmAlert('積み上げを作成しますか？')) return;
    callCreateStack({ options, sessionData, stackFormData, router });

    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setStackFormData(InitialStackFormData)
  };

  return (
    <>
      <div className='flex-1'>
        <div className='text-center text-2xl font-bold'>積み上げを作成</div>
        <div className='flex flex-col'>
          <StackFormGroup />
        </div>
      </div>
      <div className='flex justify-center pt-6'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'作成'} />
      </div>
    </>
  );
};

export default StackForm;
