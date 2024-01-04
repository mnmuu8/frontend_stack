import React, { FC, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { FormContext } from '@/context/FormContext';
import { TeamFormDataParams } from '@/common/types/form';
import { SessionContext } from '@/context/SessionContext';
import { InitialInviteTeamFormData } from '../functions/form';
import { TeamFormContext } from '../contexts/TeamFormContext';
import { InviteTeamFormContext } from '../contexts/InviteTeamFormContext';

const TeamListItem: FC<TeamFormDataParams> = ({ id, name }) => {
  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType } = formContext;

  const { setTeamFormData } = useContext(TeamFormContext);
  const { setInviteTeamFormData } = useContext(InviteTeamFormContext);

  const sessionContext = useContext(SessionContext);
  const { isAdmin } = sessionContext;

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormType('updateTeam');
    setTeamFormData({ id, name });
  };
  const handleInviteTeamFormOpen = () => {
    setFormOpen(true);
    setFormType('inviteTeam');
    if (id) {
      setInviteTeamFormData({ ...InitialInviteTeamFormData, id });
    }
  };

  return (
    <div className='flex items-center justify-between px-4 py-2'>
      <div className='text-gray-50 text-sm'>{name}</div>
      <div className='flex items-center'>
        {isAdmin && (
          <EditIcon
            className='text-gray-50 text-[18px] hover:text-gray-200 cursor-pointer mr-1'
            onClick={handleFormOpen}
          />
        )}
        <AddIcon
          className='text-gray-50 text-[18px] hover:text-gray-200 cursor-pointer'
          onClick={handleInviteTeamFormOpen}
        />
      </div>
    </div>
  );
};

export default TeamListItem;
