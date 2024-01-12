import React, { FC, useContext } from 'react';
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
import { callUpdateUser } from '../functions/api';
import { InitialUserFormData } from '../functions/form';

const UserForm: FC = () => {
  const { userFormData, setUserFormData } = useContext(UserFormContext);
  const { setFormOpen, setIsRegisterEvent, isValidate, setIsValidate } = useContext(FormContext);

  const router: NextRouter = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setUserFormData(InitialUserFormData)
  };

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();
    
    if (!dataConfirmAlert('ユーザー情報を更新しますか？')) return;
    callUpdateUser({ options, sessionData, userFormData, router });

    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setUserFormData(InitialUserFormData)
  };

  return (
    <>
      <div className='flex-1'>
        <div className='FormHeading'>ユーザー情報を更新</div>
        <div className='FormFieldGroup'>
          <UserFormGroup />
        </div>
      </div>
      <div className='FormBtnGroup'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'更新'} />
      </div>
    </>
  );
};

export default UserForm;
