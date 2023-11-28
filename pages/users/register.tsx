import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ApiOptions } from '@/types/api';
import { TeamProps } from '@/types/team';
import { ErrorMessages } from '@/types/validator';
import { UserRegisterProps } from '@/types/user';
import { getSession } from '@/utiliry/session';
import { hasValidationErrors, userValidationRules } from '@/utiliry/validator';
import { InitialUserErrorMessage, validationCheck, dataConfirmAlert } from '@/utiliry/form';
import { callCreateUser, getApiHeaders } from '@/utiliry/api';
import { FormContext } from '@/context/FormContext';
import { FormDataContext } from '@/context/FormDataContext';
import TextInput from '@/components/molecules/TextInput';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import FormSubmitButton from '@/components/atoms/FormSubmitButton';

const Register: NextPage<UserRegisterProps> = ({ email, team_id }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<TeamProps[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const formDataContext = useContext(FormDataContext);
  const { userFormData, setUserFormData } = formDataContext;

  const formContext = useContext(FormContext);
  const { isValidate, setIsValidate } = formContext;

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

  const router = useRouter();

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders(sessionData);

    if (!dataConfirmAlert('ユーザーを登録しますか？')) return;
    callCreateUser({ options, userFormData, router });
  }

  useEffect(() => {
    setIsValidate(!hasValidationErrors(userFormData));
  }, [userFormData]);

  useEffect(() => {
    const fetchTeam = async (teamId: number) => {
      const sessionData = getSession();
      if (!sessionData) return;

      const options: ApiOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.token}`
        },
        params: { id: teamId }
      };

      try {
        const response = await axios.get(`${process.env.API_ROOT_URL}/api/v1/teams/${teamId}`, options);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error(`${JSON.stringify(error)}`);
      }
    };

    fetchTeam(team_id).then((res) => {
      setUserFormData({
        ...userFormData,
        email: email,
        team: res
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
    <div className='flex-1'>
      <div className='text-center text-2xl font-bold'>ユーザー登録</div>
    </div>
    <div className='bg-gray-50 h-full min-h-screen flex justify-center items-center'>
      <div className='w-[768px] bg-white max-h-[80vh] overflow-auto'>
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
          name={'password'}
          fullWidth={true}
          multiline={false}
          minRows={1}
          required={true}
          requiredMessage={'必須入力'}
          label={'パスワード'}
          placeholder={'Password123'}
          type='password'
          onChange={handleFieldChange}
          value={userFormData.password}
        />
        <ErrorMessage errorMessages={errorMessages} errorKey={'password'} />

        <TextInput
          name={'password_confirmation'}
          fullWidth={true}
          multiline={false}
          minRows={1}
          required={true}
          requiredMessage={'必須入力'}
          label={'パスワード（確認）'}
          placeholder={'password'}
          type='Password123'
          onChange={handleFieldChange}
          value={userFormData.password_confirmation}
        />
        <ErrorMessage errorMessages={errorMessages} errorKey={'password_confirmation'} />

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

        <div className='flex justify-center pt-6'>
          <FormSubmitButton onClick={FormSubmit} disabled={isValidate} label={'登録する'} />
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { email, team_id } = context.query;

    return { props: { email, team_id } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: {} };
  }
}