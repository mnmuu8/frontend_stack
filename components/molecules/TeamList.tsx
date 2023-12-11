import React, { FC, useContext, useEffect, useState } from 'react';
import { TeamProps } from '@/types/team';
import axios from 'axios';
import TeamListItem from './TeamListItem';
import AddIcon from '@mui/icons-material/Add';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import { getApiHeaders } from '@/utiliry/api';

const TeamList: FC = () => {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType, isRegisterEvent } = formContext;
  const sessionContext = useContext(SessionContext);
  const { isAdmin } = sessionContext;

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
  };

  return (
    <div>
      <div className='flex items-center px-2 pt-4 pb-2'>
        <div className='text-gray-500 text-sm mr-4'>チーム一覧</div>
        {isAdmin && (
          <AddIcon className='text-gray-500 text-[20px] hover:text-gray-700 cursor-pointer' onClick={handleFormOpen} />
        )}
      </div>
      <div>{teams && teams.map((team: TeamProps) => <TeamListItem key={team.id} id={team.id} name={team.name} />)}</div>
    </div>
  );
};

export default TeamList;
