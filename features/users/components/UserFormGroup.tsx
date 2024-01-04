import React, { FC, useState, useEffect, useContext } from 'react';
import TextInput from '@/components/ui-elements/TextInput';
import { ApiOptions } from '@/common/types/api';
import { TeamProps } from '@/features/teams/types/team';
import { getSession } from '@/features/sessions/functions/session';

import { hasValidationErrors, userValidationRules  } from '@/common/functions/validator';
import { ErrorMessages } from '@/common/types/validator';
import ErrorMessage from '@/components/ui-elements/ErrorMessage';

import axios from 'axios';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FormContext } from '@/context/FormContext';
import { validationCheck } from '@/common/functions/form';
import { UserFormContext } from '../contexts/UserFormContext';
import { InitialUserErrorMessage } from '../functions/form';

const UserFormGroup: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<TeamProps[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const { userFormData, setUserFormData } = useContext(UserFormContext);

  const formContext = useContext(FormContext);
  const { setIsValidate } = formContext;

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(InitialUserErrorMessage);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validationRules = userValidationRules;
    validationCheck({ name, value, validationRules, errorMessages, setErrorMessages });

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleTextInputClick = () => {
    setShowResults(true);
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setQuery(value);
    setUserFormData({
      ...userFormData,
      [name]: {
        name: value,
      },
    });

    const validationRules = userValidationRules;
    validationCheck({ name, value, validationRules, errorMessages, setErrorMessages });
  };

  const handleTeamClick = (team: TeamProps) => {
    setUserFormData({
      ...userFormData,
      team: team,
    });
    setShowResults(false);
  };

  useEffect(() => {
    setIsValidate(!hasValidationErrors(userFormData));
  }, [userFormData]);

  useEffect(() => {
    const fetchUser = async () => {
      const sessionData = getSession();
      if (!sessionData) return;

      const options: ApiOptions<{ name: string }> = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.token}`,
        },
      };

      try {
        const response = await axios.get(`${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`, options);
        return response.data;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    fetchUser().then((res) => {
      setUserFormData({
        role: res.role,
        name: res.name,
        email: res.email,
        profile_content: res.profile_content,
        team: res.team,
      });
    });
  }, []);

  useEffect(() => {
    const fetchTeams = async (query: string) => {
      const sessionData = getSession();
      if (!sessionData) return;

      const options: ApiOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.token}`,
        },
        params: query ? { name: query } : undefined,
      };

      try {
        const response = await axios.get(`${process.env.API_ROOT_URL}/api/v1/teams`, options);
        return response.data.teams;
      } catch (error) {
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    fetchTeams(query).then((res) => setResults(res));
  }, [query]);

  return (
    <>
      <FormControl>
        <RadioGroup row name='role' value={userFormData.role} onChange={handleFieldChange}>
          <FormControlLabel value='admin' control={<Radio />} label='管理者' />
          <FormControlLabel value='general' control={<Radio />} label='一般' />
        </RadioGroup>
        <ErrorMessage errorMessages={errorMessages} errorKey={'role'} />
      </FormControl>

      <TextInput
        name={'name'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'ユーザー名'}
        placeholder={'uyu_morning'}
        type='text'
        onChange={handleFieldChange}
        value={userFormData.name}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'name'} />
      <TextInput
        name={'email'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'メールアドレス'}
        placeholder={'example@example.com'}
        type='text'
        onChange={handleFieldChange}
        value={userFormData.email}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'email'} />
      <TextInput
        name={'profile_content'}
        fullWidth={true}
        multiline={true}
        minRows={10}
        required={false}
        requiredMessage={'必須入力'}
        label={'プロフィール内容'}
        placeholder={'私はWebエンジニアでReactを得意としております...'}
        type='text'
        onChange={handleFieldChange}
        value={userFormData.profile_content}
      />
      <ErrorMessage errorMessages={errorMessages} errorKey={'profile_content'} />
      <TextInput
        name={'team'}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={'必須入力'}
        label={'チーム'}
        placeholder={'チームを選択してください'}
        type='text'
        onChange={(e) => handleTeamChange(e)}
        onClick={handleTextInputClick}
        value={userFormData.team.name}
      />

      {showResults && (
        <div className='max-h-[120px] overflow-y-auto'>
          {results.map((team: TeamProps) => (
            <div
              key={team.id}
              onClick={() => handleTeamClick(team)}
              className='cursor-pointer hover:bg-gray-100 py-2 px-2 bg-gray-50'
            >
              {team.name}
            </div>
          ))}
        </div>
      )}

      <ErrorMessage errorMessages={errorMessages} errorKey={'team'} />
    </>
  );
};

export default UserFormGroup;
