import React, { FC, useContext, useState } from 'react';
import { getSession } from '@/features/sessions/functions/session';
import { NextRouter, useRouter } from 'next/router';
import { FormContext } from '@/context/FormContext';
import { resetFormValue } from '@/common/functions/form';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';
import { OutputCommentFormContext } from '../contexts/OutputCommentFormContext';
import OutputCommentFormGroup from './OutputCommentFormGroup';
import { callCreateOutputComment } from '../functions/api';
import { InitialOutputCommentFormData } from '../../functions/form';
import { ErrorMessages } from '@/common/types/validator';

const OutputCommentForm: FC = () => {
  const { outputCommentFormData, setOutputCommentFormData } = useContext(OutputCommentFormContext);
  const { setFormOpen, setIsRegisterEvent } = useContext(FormContext);

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

  const router: NextRouter = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
    });
    setOutputCommentFormData(InitialOutputCommentFormData)
  };

  const FormSubmit = async () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();

    if (!dataConfirmAlert('アウトプットに対してコメントしますか？')) return;
    await callCreateOutputComment({ options, sessionData, outputCommentFormData, setErrorMessages })
      .then(() => {
        resetFormValue({
          setFormOpen,
          setIsRegisterEvent,
        });
        setOutputCommentFormData(InitialOutputCommentFormData)

        const outputId = outputCommentFormData.outputId;
        router.push(`/outputs/${outputId}`);
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <div className='flex-1'>
        <div className='FormHeading'>アウトプットに対してコメントする</div>
        <div className='FormFieldGroup'>
          <OutputCommentFormGroup errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
        </div>
      </div>
      <div className='FormBtnGroup'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} label={'コメントする'} />
      </div>
    </>
  );
};

export default OutputCommentForm;
