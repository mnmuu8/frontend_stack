import React, { FC, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormTypeProps, setFormGroupProps } from '@/types/form';
import StackInspectionFormGroup from './StackInspectionFormGroup';
import StackFormGroup from './StackFormGroup';
import UserFormGroup from './UserFormGroup';
import { getSession } from '@/utiliry/session';
import { NextRouter, useRouter } from 'next/router';
import TeamFormGroup from './TeamFormGroup';
import InviteTeamFormGroup from './InviteTeamFormGroup';
import { FormContext } from '@/context/FormContext';
import { FormDataContext } from '@/context/FormDataContext';
import { resetFormValue } from '@/utiliry/form';
import {
  callCreateIntrospection,
  callCreateStack,
  callCreateTeam,
  callInviteTeam,
  callUpdateIntrospection,
  callUpdateTeam,
  callUpdateUser,
} from '@/utiliry/api';
import { getApiHeaders } from '@/utiliry/api';
import { dataConfirmAlert } from '@/utiliry/form';
import FormSubmitButton from '../atoms/FormSubmitButton';
import FormCancelButton from '../atoms/FormCancelButton';
import OutputFormGroup from './OutputFormGroup';
import OutputCommentFormGroup from './OutputCommentFormGroup';
import { callCreateOutput } from '@/utiliry/api/outputs';
import { callCreateOutputComment } from '@/utiliry/api/outputs/comments';

const FormModal: FC = () => {
  const router: NextRouter = useRouter();

  const formContext = useContext(FormContext);
  const formDataContext = useContext(FormDataContext);

  const { formOpen, setFormOpen, formType, setIsRegisterEvent, isValidate, setIsValidate } = formContext;
  const {
    setStackFormData,
    setIntrospectionFormData,
    setUserFormData,
    setTeamFormData,
    setInviteTeamFormData,
    setShowStackIntrospection,
    setOutputFormData,
    setOutputCommentFormData,
    teamFormData,
    inviteTeamFormData,
    userFormData,
    stackFormData,
    introspectionFormData,
    outputFormData,
    outputCommentFormData,
  } = formDataContext;

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
      setStackFormData,
      setIntrospectionFormData,
      setUserFormData,
      setTeamFormData,
      setInviteTeamFormData,
      setShowStackIntrospection,
      setOutputFormData,
      setOutputCommentFormData,
    });
  };

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders(sessionData);

    if (formType === 'createStack') {
      if (!dataConfirmAlert('積み上げを作成しますか？')) return;
      callCreateStack({ options, sessionData, stackFormData, router });
    }
    if (formType === 'createStackIntrospection') {
      if (!dataConfirmAlert('反省を作成しますか？')) return;
      callCreateIntrospection({ options, introspectionFormData, setIsRegisterEvent, router });
    }
    if (formType === 'updateStackIntrospection') {
      if (!dataConfirmAlert('反省情報を更新しますか？')) return;
      callUpdateIntrospection({ options, introspectionFormData, setIsRegisterEvent, router });
    }
    if (formType === 'createTeam') {
      if (!dataConfirmAlert('チームを作成しますか？')) return;
      callCreateTeam({ options, teamFormData, setIsRegisterEvent });
    }
    if (formType === 'inviteTeam') {
      if (!dataConfirmAlert('チームに招待しますか？')) return;
      callInviteTeam({ options, inviteTeamFormData, router });
    }
    if (formType === 'updateTeam') {
      if (!dataConfirmAlert('チームを更新しますか？')) return;
      callUpdateTeam({ options, teamFormData, setIsRegisterEvent });
    }
    if (formType === 'updateUser') {
      if (!dataConfirmAlert('ユーザー情報を更新しますか？')) return;
      callUpdateUser({ options, sessionData, userFormData, router });
    }
    if (formType === 'createOutput') {
      if (!dataConfirmAlert('アウトプットを作成しますか？')) return;
      callCreateOutput({ options, outputFormData, setIsRegisterEvent, router });
    }
    if (formType === 'createOutputComment') {
      if (!dataConfirmAlert('アウトプットに対してコメントしますか？')) return;
      callCreateOutputComment({ options, outputCommentFormData, router });
    }

    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
      setIsValidate,
      setStackFormData,
      setIntrospectionFormData,
      setUserFormData,
      setTeamFormData,
      setInviteTeamFormData,
      setShowStackIntrospection,
      setOutputFormData,
      setOutputCommentFormData,
    });
  };

  const setFormGroup = ({ formType }: FormTypeProps): setFormGroupProps | undefined => {
    if (formType === 'createStack') {
      return {
        label: '積み上げを作成',
        component: <StackFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'作成'} />,
      };
    }
    if (formType === 'createStackIntrospection') {
      return {
        label: '積み上げの反省を作成',
        component: <StackInspectionFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'作成'} />,
      };
    }
    if (formType === 'updateStackIntrospection') {
      return {
        label: '積み上げの反省を編集',
        component: <StackInspectionFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'更新'} />,
      };
    }
    if (formType === 'updateUser') {
      return {
        label: 'ユーザー情報を更新',
        component: <UserFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'更新'} />,
      };
    }
    if (formType === 'createTeam') {
      return {
        label: 'チームを作成',
        component: <TeamFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'作成'} />,
      };
    }
    if (formType === 'inviteTeam') {
      return {
        label: 'チームに招待',
        component: <InviteTeamFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'招待'} />,
      };
    }
    if (formType === 'updateTeam') {
      return {
        label: 'チームを更新',
        component: <TeamFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'更新'} />,
      };
    }
    if (formType === 'createOutput') {
      return {
        label: 'アウトプットを作成',
        component: <OutputFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'作成'} />,
      };
    }
    if (formType === 'createOutputComment') {
      return {
        label: 'アウトプットに対してコメントする',
        component: <OutputCommentFormGroup />,
        button: <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'コメントする'} />,
      };
    }
  };

  const currentFormGroup = setFormGroup({ formType });
  const cancelButton = <FormCancelButton onClick={FormCancel} />;

  return (
    <>
      <Modal open={formOpen}>
        <Box className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[720px] h-auto max-h-[80vh] p-10 flex flex-col overflow-y-scroll'>
          <div className='flex-1'>
            <div className='text-center text-2xl font-bold'>{currentFormGroup?.label}</div>
            <div className='flex flex-col'>{currentFormGroup?.component}</div>
          </div>
          <div className='flex justify-center pt-6'>
            {cancelButton}
            {currentFormGroup?.button}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default FormModal;
