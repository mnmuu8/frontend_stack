import React, { FC, useContext } from 'react';
import { getSession } from '@/features/sessions/functions/session';
import { NextRouter, useRouter } from 'next/router';
import { FormContext } from '@/context/FormContext';
import { InitialIntrospectionFormData, resetFormValue } from '@/common/functions/form';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';
import StackInspectionFormGroup from './StackInspectionFormGroup';
import { IntrospectionFormContext } from '../contexts/IntrospectionFormContext';
import { callCreateIntrospection, callUpdateIntrospection } from '../functions/api';

const StackIntrospectionForm: FC = () => {
  const { introspectionFormData, setIntrospectionFormData } = useContext(IntrospectionFormContext);
  const { setFormOpen, setIsRegisterEvent, isValidate, setIsValidate } = useContext(FormContext);

  const { formType } = useContext(FormContext);

  const router: NextRouter = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setIntrospectionFormData(InitialIntrospectionFormData)
  };

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();

    if (formType === 'createStackIntrospection') {
      if (!dataConfirmAlert('反省を作成しますか？')) return;
      callCreateIntrospection({ options, introspectionFormData, setIsRegisterEvent, router });
    }
    if (formType === 'updateStackIntrospection') {
      if (!dataConfirmAlert('反省情報を更新しますか？')) return;
      callUpdateIntrospection({ options, introspectionFormData, setIsRegisterEvent, router });
    }

    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setIntrospectionFormData(InitialIntrospectionFormData);
  };

  return (
    <>
      <div className='flex-1'>
        <div className='text-center text-2xl font-bold'>積み上げの反省を作成</div>
        <div className='flex flex-col'>
          <StackInspectionFormGroup />
        </div>
      </div>
      <div className='flex justify-center pt-6'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'作成'} />
      </div>
    </>
  );
};

export default StackIntrospectionForm;
