import React, { FC, useContext, useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { LayoutProps } from '@/types/utils';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import { getSession } from '@/utiliry/session';
import axios from 'axios';
import { SessionContext } from '@/context/SessionContext';
import { getApiHeaders } from '@/utiliry/api';

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const appContext = useContext(AppContext);
  const { drawerArea } = appContext;

  const sessionContext = useContext(SessionContext);
  const { setSessionUser, sessionUser, setIsAdmin, isAdmin } = sessionContext;

  const mainStyle: React.CSSProperties = {
    width: drawerArea ? 'calc(100% - 240px)' : '100%',
  };

  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = getApiHeaders(sessionData);
    axios.get(`${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`, options)
      .then((response) => {
        const { data } = response;
        setSessionUser(data);
      })
      .catch((error) => {
        throw new Error(`${JSON.stringify(error)}`);
      });
  }, []);

  useEffect(() => {
    sessionUser && sessionUser.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
  }, [sessionUser, isAdmin]);

  useEffect(() => {
    const CheckSession = async () => {
      try {
        const response = await axios.get('/api/check-session');
        if (!response.data.session) {
          axios.post('/api/logout');
          localStorage.removeItem('session');
          setSessionUser(undefined);

          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };
    CheckSession()
  }, [router]);

  return (
    <div className='h-screen'>
      <Header />
      <div className='h-[calc(100%-60px)] flex'>
        <Sidebar />
        <main className='ml-auto duration-300' style={mainStyle}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
