import React, { FC, useState } from 'react'
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const setSession = (token: string, userId: number, exp: number) => {
    let lastActivity = new Date().getTime();
    const session = {
      token,
      userId,
      exp,
      lastActivity,
    };
    localStorage.setItem('session', JSON.stringify(session));
  };

  const loginUser = () => {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(`${JSON.stringify(error)}`);
        });
      }
      return response.json();
    })
    .then(data => {
      setSession(data.access_token, data.user_id, data.exp)
      router.push('/');
    })
    .catch((error) => {
      throw new Error(`${JSON.stringify(error)}`);
    });
  }

  return (
    <div>
      <div className='font-mono text-white text-2xl text-center mb-4'>Skill Climbing</div>
      <input className='w-full p-2 mb-2' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className='w-full p-2 mb-2' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button className='bg-black text-white w-full' onClick={loginUser}>ログイン</Button>
    </div>
  )
}

export default LoginForm
