import React, { FC, useContext, useEffect, useState } from 'react';
import { getSession } from '@/utiliry/session';
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
      const sessionData = getSession();
      if (!sessionData) return;

      const options = getApiHeaders(sessionData);
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
