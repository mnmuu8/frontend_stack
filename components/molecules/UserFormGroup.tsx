import React, { FC, useState, useEffect } from 'react'
import TextInput from './TextInput';
import { ControlAndSetValueProps, ApiOptions, Team } from '../../types/types';
import { getSession } from '@/utiliry/session';
import axios from 'axios';

const UserFormGroup: FC<ControlAndSetValueProps> = ({ control, setValue }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Team[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [teamValue, setTeamValue] = useState<string|number>("");

  const handleTextInputClick = () => {
    setShowResults(true);
  };
  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setTeamValue(e.target.value);
  };
  const handleTeamClick = (team: Team) => {
    setValue('team', team.id);
    setTeamValue(team.name);
    setShowResults(false);
  }

  useEffect(() => {
    const fetchTeams = async (query: string) => {
      const sessionData = getSession();
      if (!sessionData) return;
  
      const options: ApiOptions<{name: string}> = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.token}`
        },
        params: query ? { name: query } : undefined
      }
  
      try {
        const response = await axios.get(`${process.env.API_ROOT_URL}/api/v1/teams`, options);
        return response.data.teams;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    fetchTeams(query).then(res => setResults(res));
  }, [query])

  return (
    <>
      <TextInput
        control={control}
        name={"name"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"ユーザー名"}
        placeholder={"uyu_morning"}
        type='text'
      />

      <TextInput
        control={control}
        name={"email"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"メールアドレス"}
        placeholder={"example@example.com"}
        type='text'
      />

      <TextInput
        control={control}
        name={"profile_content"}
        fullWidth={true}
        multiline={true}
        minRows={10}
        required={true}
        requiredMessage={"必須入力"}
        label={"プロフィール内容"}
        placeholder={"私はWebエンジニアでReactを得意としております..."}
        type='text'
      />

      <TextInput
        control={control}
        name={"team"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"チーム"}
        placeholder={"チームを選択してください"}
        type='text'
        onChange={(e) => handleTeamChange(e)}
        onClick={handleTextInputClick}
        value={teamValue}
      />
      {showResults && (
        <div className="max-h-[120px] overflow-y-auto">
          {results.map((team: Team) => (
            <div key={team.id} onClick={() => handleTeamClick(team)} className='cursor-pointer hover:bg-gray-100 py-2 px-2 bg-gray-50'>
              {team.name}
            </div>
          ))}
        </div>
      )}

    </>
  )
}

export default UserFormGroup
