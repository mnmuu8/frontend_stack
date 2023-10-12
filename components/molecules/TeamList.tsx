import React, { FC, useContext, useEffect, useState } from 'react'
import { getSession } from '@/utiliry/session';
import { ApiOptions, TeamProps } from '@/types/types';
import axios from 'axios';
import TeamListItem from './TeamListItem';
import AddIcon from '@mui/icons-material/Add';
import AppContext from '@/context/AppContext';

const TeamList: FC = () => {
  const [teams, setTeams] = useState<TeamProps[]>([])
  const appContext = useContext(AppContext);
  const { setFormOpen, setFormType, isRegisterEvent } = appContext

  useEffect(() => {
    const fetchTeams = async () => {
      const sessionData = getSession();
      if (!sessionData) return;

      const options: ApiOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.token}`
        },
      }

      try {
        const response = await axios.get(`${process.env.API_ROOT_URL}/api/v1/teams`, options);
        return response.data.teams;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    fetchTeams().then(res => setTeams(res));
  }, [isRegisterEvent])

  const handleFormOpen = () => {
    setFormOpen(true);
    setFormType('createTeam');
  }

  return (
    <div>
      <div className='flex items-center px-2 pt-4 pb-2'>
        <div className='text-gray-500 text-sm mr-4'>チーム一覧</div>
        <AddIcon className='text-gray-500 text-[20px] hover:text-gray-700 cursor-pointer' onClick={handleFormOpen}/>
      </div>
      <div>
        {teams &&
          teams.map((team: TeamProps) => (
            <TeamListItem key={team.id} id={team.id} name={team.name} />
          ))
        }
      </div>
    </div>
  )
}

export default TeamList
