import React, { FC, useContext } from 'react';
import { getSession } from '@/features/sessions/functions/session';
import { useRouter } from 'next/router';
import { FormContext } from '@/context/FormContext';
import { InitialInviteTeamFormData, resetFormValue } from '@/common/functions/form';
import { callInviteTeam } from '@/common/functions/api';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';
import InviteTeamFormGroup from './InviteTeamFormGroup';
import { InviteTeamFormContext } from '../contexts/InviteTeamFormContext';

const InviteTeamForm: FC = () => {
  const { inviteTeamFormData, setInviteTeamFormData } = useContext(InviteTeamFormContext);
  const { setFormOpen, setIsRegisterEvent, setIsValidate } = useContext(FormContext);

  const router = useRouter();

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setInviteTeamFormData(InitialInviteTeamFormData)
  };

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();

    if (!dataConfirmAlert('チームに招待しますか？')) return;
    callInviteTeam({ options, inviteTeamFormData, router });

    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setInviteTeamFormData(InitialInviteTeamFormData)
  };

  return (
    <>
      <div className='flex-1'>
        <div className='text-center text-2xl font-bold'>チームに招待</div>
        <div className='flex flex-col'>
          <InviteTeamFormGroup />
        </div>
      </div>
      <div className='flex justify-center pt-6'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} label={'招待'} />
      </div>
    </>
  );
};

export default InviteTeamForm;
