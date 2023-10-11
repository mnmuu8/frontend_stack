import React, { FC, useState, useEffect } from 'react'
import TextInput from './TextInput';
import { ControlAndSetValueProps, ApiOptions, TeamProps } from '../../types/types';
import { getSession } from '@/utiliry/session';
import axios from 'axios';

const UserFormGroup: FC<ControlAndSetValueProps> = ({ control, setValue }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<TeamProps[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [teamValue, setTeamValue] = useState<string|number>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [EmailValue, setEmailValue] = useState<string>("");
  const [ProfileContentValue, setProfileContentValue] = useState<string>("");

  const handleTextInputClick = () => {
    setShowResults(true);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value)
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  };
  const handleProfileContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileContentValue(e.target.value)
  };
  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setTeamValue(e.target.value);
  };
  const handleTeamClick = (team: TeamProps) => {
    setValue('team', team.id);
    setTeamValue(team.name);
    setShowResults(false);
  }

  useEffect(() => {
    const fetchUser = async () => {
      const sessionData = getSession();
      if (!sessionData) return;

      const options: ApiOptions<{name: string}> = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.token}`
        }
      }

      try {
        const response = await axios.get(`${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`, options);
        return response.data;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    }

    fetchUser().then(res => {
      setNameValue(res.name);
      setEmailValue(res.email);
      setProfileContentValue(res.profile_content);
      setTeamValue(res.team.name);
    });
  }, [])

  useEffect(() => {
    const fetchTeams = async (query: string) => {
      const sessionData = getSession();
      if (!sessionData) return;

      const options: ApiOptions = {
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
        onChange={(e) => handleNameChange(e)}
        value={nameValue}
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
        onChange={(e) => handleEmailChange(e)}
        value={EmailValue}
      />

      <TextInput
        control={control}
        name={"profile_content"}
        fullWidth={true}
        multiline={true}
        minRows={10}
        required={false}
        requiredMessage={"必須入力"}
        label={"プロフィール内容"}
        placeholder={"私はWebエンジニアでReactを得意としております..."}
        type='text'
        onChange={(e) => handleProfileContentChange(e)}
        value={ProfileContentValue}
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
          {results.map((team: TeamProps) => (
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
