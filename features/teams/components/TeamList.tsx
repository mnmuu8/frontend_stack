import React, { FC, useContext, useEffect, useState } from 'react';
import { TeamProps } from '../types/team';
import axios from 'axios';
import TeamListItem from './TeamListItem';
import AddIcon from '@mui/icons-material/Add';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import { getApiHeaders } from '@/common/functions/api';

const TeamList: FC = () => {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const { setFormOpen, setFormType, setIsRegisterEvent, isRegisterEvent } = useContext(FormContext);
  const { isAdmin } = useContext(SessionContext);

  useEffect(() => {
    const fetchTeams = async () => {
      const options = getApiHeaders();
      try {
        const response = await axios.get(`${process.env.API_ROOT_URL}/api/v1/teams`, options);
        return response.data.teams;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    fetchTeams().then((res) => setTeams(res));
  }, [isRegisterEvent]);

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormType('createTeam');
    setIsRegisterEvent(false)
  };

  return (
    <>
      <div className='flex items-center justify-between px-4 py-3'>
        <div className='text-sm text-gray-200'>チーム一覧</div>
        {isAdmin && (
          <AddIcon className='text-[18px] text-gray-200 hover:text-gray-400 cursor-pointer' onClick={handleFormOpen} />
        )}
      </div>
      <div>{teams && teams.map((team: TeamProps) => <TeamListItem key={team.id} id={team.id} name={team.name} />)}</div>
    </>
  );
};

export default TeamList;
