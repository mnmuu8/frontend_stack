import React, { FC, useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import AppContext from '@/context/AppContext';
import { TeamFormDataParams } from '@/types/types';

const TeamListItem: FC<TeamFormDataParams> = ({ id, name }) => {
  const appContext = useContext(AppContext);
  const { setFormOpen, setFormType, setTeamFormData } = appContext;

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormType("updateTeam");
    setTeamFormData({
      id: id,
      name: name,
    })
  }

  return (
    <div className='flex items-center justify-between px-6 py-2'>
      <div className='bg-gray-50 text-sm'>{name}</div>
      <EditIcon className='text-gray-500 text-[16px] hover:text-gray-700 cursor-pointer' onClick={handleFormOpen}/>
    </div>
  )
}

export default TeamListItem
