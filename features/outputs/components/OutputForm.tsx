import React, { FC, useContext, useState } from 'react';
import { getSession } from '@/features/sessions/functions/session';
import { NextRouter, useRouter } from 'next/router';
import { FormContext } from '@/context/FormContext';
import { resetFormValue } from '@/common/functions/form';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';

import { OutputFormContext } from '../contexts/OutputFormContext';
import OutputFormGroup from './OutputFormGroup';
import { callCreateOutput } from '../functions/api';
import { InitialOutputFormData } from '../functions/form';
import { ErrorMessages } from '@/common/types/validator';

const OutputForm: FC = () => {
  const { outputFormData, setOutputFormData } = useContext(OutputFormContext);
  const { setFormOpen, setIsRegisterEvent } = useContext(FormContext);

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

  const router: NextRouter = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
    });
    setOutputFormData(InitialOutputFormData)
  };

  const FormSubmit = async () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();

    if (!dataConfirmAlert('アウトプットを作成しますか？')) return;
    await callCreateOutput({ options, outputFormData, setErrorMessages })
      .then(() => {
        resetFormValue({
          setFormOpen,
          setIsRegisterEvent,
        });
        setOutputFormData(InitialOutputFormData)

        router.push('/outputs');
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <div className='flex-1'>
        <div className='FormHeading'>アウトプットを作成</div>
        <div className='FormFieldGroup'>
          <OutputFormGroup errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
        </div>
      </div>
      <div className='FormBtnGroup'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} label={'作成'} />
      </div>
    </>
  );
};

export default OutputForm;
