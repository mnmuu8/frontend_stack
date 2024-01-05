import React, { FC, useContext, useEffect } from 'react';
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

const OutputCommentForm: FC = () => {
  const { outputCommentFormData, setOutputCommentFormData } = useContext(OutputCommentFormContext);
  const { setFormOpen, setIsRegisterEvent, setIsValidate } = useContext(FormContext);

  const router: NextRouter = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setOutputCommentFormData(InitialOutputCommentFormData)
  };

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();

    if (!dataConfirmAlert('アウトプットに対してコメントしますか？')) return;
    callCreateOutputComment({ options, outputCommentFormData, router });

    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setOutputCommentFormData(InitialOutputCommentFormData)
  };

  useEffect(() => {
    console.log(outputCommentFormData)
  }, [outputCommentFormData])

  return (
    <>
      <div className='flex-1'>
        <div className='text-center text-2xl font-bold'>アウトプットに対してコメントする</div>
        <div className='flex flex-col'>
          <OutputCommentFormGroup />
        </div>
      </div>
      <div className='flex justify-center pt-6'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} label={'コメントする'} />
      </div>
    </>
  );
};

export default OutputCommentForm;
