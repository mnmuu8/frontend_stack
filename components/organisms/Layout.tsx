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
  const appContext = useContext(AppContext);
  const { drawerArea } = appContext;

  const sessionContext = useContext(SessionContext);
  const { setSessionUser, sessionUser, setIsAdmin, isAdmin } = sessionContext;

  const mainStyle: React.CSSProperties = {
    width: drawerArea ? 'calc(100% - 240px)' : '100%',
  };

  const router = useRouter();

  const checkActivity = () => {
    const sessionData = getSession();
    if (sessionData === false) return;

    const currentTime = new Date().getTime();
    if (currentTime - sessionData.lastActivity >= sessionData.exp) {
      localStorage.removeItem('session');
    }
  };

  const updateActivity = () => {
    const sessionData = getSession();
    if (sessionData === false) return;

    const lastActivity = new Date().getTime();
    sessionData.lastActivity = lastActivity;
    localStorage.setItem('session', JSON.stringify(sessionData));
  };

  const handleRouteChange = () => {
    updateActivity();
  };

  useEffect((): void => {
    const sessionData = getSession();
    if (sessionData === false) {
      router.push('/login');
      return;
    }

    const options = getApiHeaders();

    axios
      .get(`${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`, options)
      .then((response) => {
        const { data } = response;
        setSessionUser(data);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          throw new Error(`${JSON.stringify(data)}`);
        } else {
          throw new Error(`${JSON.stringify(error)}`);
        }
      });
  }, []);

  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) return;

    updateActivity();

    router.events.on('routeChangeComplete', handleRouteChange);
    const intervalId = setInterval(checkActivity, 60 * 3000);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      clearInterval(intervalId);
    };
  }, [router]);

  useEffect(() => {
    sessionUser && sessionUser.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
  }, [sessionUser, isAdmin]);

  return (
    <div className='h-screen'>
      <Header />
      <div className='h-[calc(100%-60px)] flex'>
        <Sidebar />
        <main className='ml-auto duration-300' style={mainStyle}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
