import React, { FC, useContext, useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { LayoutProps } from '@/types/types'
import AppContext from '@/context/AppContext'
import UserAuthentication from '../atoms/UserAuthentication'
import { useRouter } from 'next/router';
import axios from 'axios'
import { getSession } from '@/utiliry/session'

const Layout: FC<LayoutProps> = ({ children }) => {

  const appContext = useContext(AppContext);
  const {drawerOpen, setSessionUser} = appContext;

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

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}`
      }
    }
    axios.get(`http://localhost:3000/api/v1/users/${sessionData.userId}`, options)
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
      <UserAuthentication>
        <Header />
      </UserAuthentication>
      <Sidebar />
      <main style={mainStyle}>{children}</main>
    </>
  )
}

export default Layout
