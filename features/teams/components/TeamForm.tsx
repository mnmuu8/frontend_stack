import React, { FC, useContext } from 'react';
import { getSession } from '@/features/sessions/functions/session';
import { FormContext } from '@/context/FormContext';
import { InitialTeamFormData, resetFormValue } from '@/common/functions/form';
import { callCreateTeam, callUpdateTeam } from '@/common/functions/api';
import { getApiHeaders } from '@/common/functions/api';
import { dataConfirmAlert } from '@/common/functions/form';
import FormSubmitButton from '@/components/ui-elements/FormSubmitButton';
import FormCancelButton from '@/components/ui-elements/FormCancelButton';
import TeamFormGroup from './TeamFormGroup';
import { TeamFormContext } from '../contexts/TeamFormContext';

const TeamForm: FC = () => {
  const { teamFormData, setTeamFormData } = useContext(TeamFormContext);
  const { setFormOpen, setIsRegisterEvent, isValidate, setIsValidate } = useContext(FormContext);

  const { formType } = useContext(FormContext);

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setTeamFormData(InitialTeamFormData)
  };

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders();
    
    if (formType === 'createTeam') {
      if (!dataConfirmAlert('チームを作成しますか？')) return;
      callCreateTeam({ options, teamFormData, setIsRegisterEvent });
    }
    if (formType === 'updateTeam') {
      if (!dataConfirmAlert('チームを更新しますか？')) return;
      callUpdateTeam({ options, teamFormData, setIsRegisterEvent });
    }

    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
    });
    setTeamFormData(InitialTeamFormData)
  };

  return (
    <>
      <div className='flex-1'>
        <div className='text-center text-2xl font-bold'>チームを作成</div>
        <div className='flex flex-col'>
          <TeamFormGroup />
        </div>
      </div>
      <div className='flex justify-center pt-6'>
        <FormCancelButton onClick={FormCancel} />
        <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'作成'} />
      </div>
    </>
  );
};

export default TeamForm;
