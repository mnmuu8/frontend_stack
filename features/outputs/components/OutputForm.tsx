import React, { FC, useContext, useEffect } from 'react';
import { getSession } from '@/features/sessions/functions/session';
import { NextRouter, useRouter } from 'next/router';
import { FormContext } from '@/context/FormContext';
import { InitialOutputFormData, resetFormValue } from '@/common/functions/form';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';

import { OutputFormContext } from '../contexts/OutputFormContext';
import OutputFormGroup from './OutputFormGroup';
import { callCreateOutput } from '../functions/outputs';

const OutputForm: FC = () => {
  const { outputFormData, setOutputFormData } = useContext(OutputFormContext);
  const { setFormOpen, setIsRegisterEvent, setIsValidate } = useContext(FormContext);

  const router: NextRouter = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setOutputFormData(InitialOutputFormData)
  };

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();

    if (!dataConfirmAlert('アウトプットを作成しますか？')) return;
    callCreateOutput({ options, outputFormData, setIsRegisterEvent, router });

    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setOutputFormData(InitialOutputFormData)
  };

  useEffect(() => {
    console.log(outputFormData)
  }, [outputFormData])

  return (
    <>
      <div className='flex-1'>
        <div className='text-center text-2xl font-bold'>アウトプットを作成</div>
        <div className='flex flex-col'>
          <OutputFormGroup />
        </div>
      </div>
      <div className='flex justify-center pt-6'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} label={'作成'} />
      </div>
    </>
  );
};

export default OutputForm;
