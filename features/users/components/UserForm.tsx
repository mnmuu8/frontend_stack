import React, { FC, useContext, useState } from 'react';
import { getSession } from '@/features/sessions/functions/session';
import { NextRouter, useRouter } from 'next/router';
import { FormContext } from '@/context/FormContext';
import { resetFormValue } from '@/common/functions/form';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';
import UserFormGroup from './UserFormGroup';
import { UserFormContext } from '../contexts/UserFormContext';
import { callUpdateUser } from '../functions/update';
import { InitialUserFormData } from '../functions/form';
import { ErrorMessages } from '@/common/types/validator';

const UserForm: FC = () => {
  const { userFormData, setUserFormData } = useContext(UserFormContext);
  const { setFormOpen, setIsRegisterEvent } = useContext(FormContext);

  const [ errorMessages, setErrorMessages ] = useState<ErrorMessages>({});

  const router: NextRouter = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
    });
    setUserFormData(InitialUserFormData)
  };

  const FormSubmit = async () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();

    if (!dataConfirmAlert('ユーザー情報を更新しますか？')) return;
    await callUpdateUser({ options, sessionData, userFormData, setErrorMessages })
      .then(() => {
        resetFormValue({
          setFormOpen,
          setIsRegisterEvent,
        });
        setUserFormData(InitialUserFormData)

        router.push('/profile')
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <div className='flex-1'>
        <div className='FormHeading'>ユーザー情報を更新</div>
        <div className='FormFieldGroup'>
          <UserFormGroup errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
        </div>
      </div>
      <div className='FormBtnGroup'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} label={'更新'} />
      </div>
    </>
  );
};

export default UserForm;
