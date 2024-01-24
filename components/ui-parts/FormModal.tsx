import React, { FC, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import StackForm from '@/features/stacks/components/StackForm';
import UserForm from '@/features/users/components/UserForm';
import TeamForm from '@/features/teams/components/TeamForm';
import StackIntrospectionForm from '@/features/introspections/components/StackIntrospectionForm';
import InviteTeamForm from '@/features/teams/components/InviteTeamForm';
import OutputForm from '@/features/outputs/components/OutputForm';
import OutputCommentForm from '@/features/outputs/comments/components/OutputCommentForm';
import { dataConfirmAlert, resetFormValue } from '@/common/functions/form';
import { FormContext } from '@/context/FormContext';
import { InitialStackFormData } from '@/features/stacks/functions/form';
import { InitialIntrospectionFormData } from '@/features/introspections/functions/form';
import { InitialUserFormData } from '@/features/users/functions/form';
import { InitialInviteTeamFormData, InitialTeamFormData } from '@/features/teams/functions/form';
import { InitialOutputCommentFormData, InitialOutputFormData } from '@/features/outputs/functions/form';
import { StackFormContext } from '@/features/stacks/contexts/StackFormContext';
import { IntrospectionFormContext } from '@/features/introspections/contexts/IntrospectionFormContext';
import { UserFormContext } from '@/features/users/contexts/UserFormContext';
import { TeamFormContext } from '@/features/teams/contexts/TeamFormContext';
import { InviteTeamFormContext } from '@/features/teams/contexts/InviteTeamFormContext';
import { OutputFormContext } from '@/features/outputs/contexts/OutputFormContext';
import { OutputCommentFormContext } from '@/features/outputs/comments/contexts/OutputCommentFormContext';
import { StackIntrospectionContext } from '@/features/introspections/contexts/StackIntrospectionContext';

const FormModal: FC = () => {
  const { formOpen, setFormOpen, formType, setIsRegisterEvent } = useContext(FormContext);

  const { setStackFormData } = useContext(StackFormContext);
  const { setIntrospectionFormData } = useContext(IntrospectionFormContext);
  const { setUserFormData } = useContext(UserFormContext);
  const { setTeamFormData } = useContext(TeamFormContext);
  const { setInviteTeamFormData } = useContext(InviteTeamFormContext);
  const { setOutputFormData } = useContext(OutputFormContext);
  const { setOutputCommentFormData } = useContext(OutputCommentFormContext);
  const { setShowStackIntrospection } = useContext(StackIntrospectionContext);

  const insideRef = useRef<HTMLDivElement>(null);
  const handleClickOutside: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = insideRef.current;
    if (!el) return;

    if (!el.contains(e.target as Node)) {
      FormCancel();
    }
  };

  const FormCancel = () => {
    if (!dataConfirmAlert('入力した値が削除されます')) return;
    resetFormValue({
      setFormOpen,
      setIsRegisterEvent,
    });
    setStackFormData(InitialStackFormData);
    setIntrospectionFormData(InitialIntrospectionFormData);
    setUserFormData(InitialUserFormData);
    setTeamFormData(InitialTeamFormData);
    setInviteTeamFormData(InitialInviteTeamFormData);
    setOutputFormData(InitialOutputFormData);
    setOutputCommentFormData(InitialOutputCommentFormData);
    setShowStackIntrospection(undefined);
  };

  const SelectForm = () => {
    if (formType == 'createStack') return <StackForm />;
    if (formType == 'updateStack') return <StackForm />;
    if (formType == 'updateUser') return <UserForm />;
    if (formType == 'createTeam') return <TeamForm />;
    if (formType == 'updateTeam') return <TeamForm />;
    if (formType == 'createStackIntrospection') return <StackIntrospectionForm />;
    if (formType == 'updateStackIntrospection') return <StackIntrospectionForm />;
    if (formType == 'inviteTeam') return <InviteTeamForm />;
    if (formType == 'createOutput') return <OutputForm />;
    if (formType == 'createOutputComment') return <OutputCommentForm />;
  };

  return (
    <div className='insideArea' onClick={handleClickOutside}>
      <Modal open={formOpen}>
        <Box
          ref={insideRef}
          className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[720px] h-auto max-h-[80vh] p-10 flex flex-col overflow-y-scroll'
        >
          {SelectForm()}
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
