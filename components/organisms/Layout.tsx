import React, { FC, useContext, useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { ApiOptions } from '@/types/api'
import { LayoutProps } from '@/types/utils'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/router';
import { getSession } from '@/utiliry/session'
import axios from 'axios'
import { SessionContext } from '@/context/SessionContext'

const Layout: FC<LayoutProps> = ({ children }) => {

  const appContext = useContext(AppContext);
  const {drawerOpen} = appContext;
  
  const sessionContext = useContext(SessionContext)
  const { setSessionUser } = sessionContext;

  const mainStyle: React.CSSProperties = {
    width: drawerOpen ? 'calc(100% - 240px)' : '',
    left: drawerOpen ? 'auto' : 0,
  }

  const router = useRouter();

  const checkActivity = () => {    
    const sessionData = getSession();
    const currentTime = new Date().getTime();
    if ((currentTime - sessionData.lastActivity) >= sessionData.exp) {
      localStorage.removeItem('session');
    }
  };

  const updateActivity = () => {
    const sessionData = getSession();
    const lastActivity = new Date().getTime();
    sessionData.lastActivity = lastActivity;
    localStorage.setItem('session', JSON.stringify(sessionData));
  };

  const handleRouteChange = () => {
    updateActivity();
  };

  useEffect(() => {
    const sessionData = getSession();
    if (!sessionData) {
      router.push('/login');
    }
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
    const sessionData = getSession();
    if (!sessionData) return;

    const options: ApiOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}`
      }
    }
    axios.get(`${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`, options)
    .then(response => {
      const { data } = response;
      setSessionUser(data);
    })
    .catch(error => {
      if (error.response) {
        const { data } = error.response;
        throw new Error(`${JSON.stringify(data)}`);
      } else {
        throw new Error(`${JSON.stringify(error)}`);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <main style={mainStyle}>{children}</main>
    </>
  )
}

export default Layout
