import React, { FC, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import { TeamFormDataParams } from '../types/context';
import { InitialInviteTeamFormData } from '../functions/form';
import { TeamFormContext } from '../contexts/TeamFormContext';
import { InviteTeamFormContext } from '../contexts/InviteTeamFormContext';
import { dataConfirmAlert } from '@/common/functions/form';
import { fetchDeleteTeam } from '@/features/teams/functions/delete';

const TeamListItem: FC<TeamFormDataParams> = ({ id, name }) => {
  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType, setIsRegisterEvent } = formContext;

  const { setTeamFormData } = useContext(TeamFormContext);
  const { setInviteTeamFormData } = useContext(InviteTeamFormContext);

  const { isAdmin } = useContext(SessionContext);

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormType('updateTeam');
    setIsRegisterEvent(false);
    setTeamFormData({ id, name });
  };

  const handleInviteTeamFormOpen = () => {
    setFormOpen(true);
    setFormType('inviteTeam');
    setIsRegisterEvent(false);
    if (id) {
      setInviteTeamFormData({ ...InitialInviteTeamFormData, id });
    }
  };
  const handleDelete = () => {
    if (!dataConfirmAlert('削除したチームは復旧できません。本当に削除しますか？')) return;
    if (!id) return;

    fetchDeleteTeam(id);
  }

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
        {isAdmin && <DeleteIcon onClick={handleDelete} className='text-white'/>}
      </div>
    </div>
  );
};

export default TeamListItem;
