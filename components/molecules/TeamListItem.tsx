import React, { FC, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { FormContext } from '@/context/FormContext';
import { FormDataContext } from '@/context/FormDataContext';
import { TeamFormDataParams } from '@/types/form';
import { SessionContext } from '@/context/SessionContext';
import { InitialInviteTeamFormData } from '@/utiliry/form';

const TeamListItem: FC<TeamFormDataParams> = ({ id, name }) => {
  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType } = formContext;

  const formDataContext = useContext(FormDataContext);
  const { setTeamFormData, setInviteTeamFormData } = formDataContext;

  const sessionContext = useContext(SessionContext);
  const { isAdmin } = sessionContext;

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormType('updateTeam');
    setTeamFormData({
      id: id,
      name: name,
    });
  };
  const handleInviteTeamFormOpen = () => {
    setFormOpen(true);
    setFormType('inviteTeam');
    if (id) {
      setInviteTeamFormData({ ...InitialInviteTeamFormData, id });
    }
  };

  return (
    <div className='flex items-center justify-between px-6 py-2'>
      <div className='bg-gray-50 text-sm'>{name}</div>
      {isAdmin && (
        <EditIcon className='text-gray-500 text-[16px] hover:text-gray-700 cursor-pointer' onClick={handleFormOpen} />
      )}
      <AddIcon
        className='text-gray-500 text-[16px] hover:text-gray-700 cursor-pointer'
        onClick={handleInviteTeamFormOpen}
      />
    </div>
  );
};

export default TeamListItem;
