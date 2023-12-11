import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { ApiOptions } from '@/types/api';
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
import UserFormGroup from '@/components/molecules/UserFormGroup';

const Register: NextPage<UserRegisterProps> = ({ email, team_id }) => {
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

  const router = useRouter();

  const FormSubmit = () => {
    const options = getApiHeaders();

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

  return (
    <>
    <div className='flex-1'>
      <div className='text-center text-2xl font-bold'>ユーザー登録</div>
    </div>
    <div className='bg-gray-50 h-full min-h-screen flex justify-center items-center'>
      <div className='w-[768px] bg-white max-h-[80vh] overflow-auto'>
        <UserFormGroup />

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