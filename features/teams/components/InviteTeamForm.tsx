import React, { FC, useContext, useState } from 'react';
import { getSession } from '@/features/sessions/functions/session';
import { FormContext } from '@/context/FormContext';
import { resetFormValue } from '@/common/functions/form';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';
import InviteTeamFormGroup from './InviteTeamFormGroup';
import { InviteTeamFormContext } from '../contexts/InviteTeamFormContext';
import { callInviteTeam } from '../functions/api';
import { InitialInviteTeamFormData } from '../functions/form';
import { ErrorMessages } from '@/common/types/validator';

const InviteTeamForm: FC = () => {
  const { inviteTeamFormData, setInviteTeamFormData } = useContext(InviteTeamFormContext);
  const { setFormOpen, setIsRegisterEvent } = useContext(FormContext);

  const [ errorMessages, setErrorMessages ] = useState<ErrorMessages>({});

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
    });
    setInviteTeamFormData(InitialInviteTeamFormData)
  };

  const FormSubmit = async () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();

    if (!dataConfirmAlert('チームに招待しますか？')) return;
    await callInviteTeam({ options, inviteTeamFormData, setErrorMessages })
      .then(() => {
        resetFormValue({
          setFormOpen,
          setIsRegisterEvent,
        });
        setInviteTeamFormData(InitialInviteTeamFormData)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <div className='flex-1'>
        <div className='FormHeading'>チームに招待</div>
        <div className='FormFieldGroup'>
          <InviteTeamFormGroup errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
        </div>
      </div>
      <div className='FormBtnGroup'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} label={'招待'} />
      </div>
    </>
  );
};

export default InviteTeamForm;
