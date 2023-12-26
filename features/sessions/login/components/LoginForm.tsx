import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import axios from 'axios';
import { siteTitle } from '@/common/constans/config';
import { setSession } from '../../functions/session';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const loginUser = () => {
    axios
      .post(`/api/login`, {
        email,
        password,
      })
      .then((response) => {
        const { data } = response;
        setSession(data.access_token, data.user_id, data.exp, data.role);
        router.push('/');
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          throw new Error(`${JSON.stringify(data)}`);
        } else {
          throw new Error(`${JSON.stringify(error)}`);
        }
      });
  };

  return (
    <div>
      <div className='font-mono text-white text-2xl text-center mb-4'>{siteTitle}</div>
      <input
        className='w-full p-2 mb-2'
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='w-full p-2 mb-2'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className='bg-black text-white w-full' onClick={loginUser}>
        ログイン
      </Button>
    </div>
  );
};

export default LoginForm;
