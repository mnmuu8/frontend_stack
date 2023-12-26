import React, { FC, useContext, useEffect, useMemo } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { LayoutProps } from '@/common/types/utils';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import { getSession } from '@/features/sessions/functions/session';
import axios from 'axios';
import { SessionContext } from '@/context/SessionContext';
import { getApiHeaders } from '@/common/functions/api';

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const { drawerArea } = useContext(AppContext);
  const { setSessionUser, sessionUser, setIsAdmin, isAdmin } = useContext(SessionContext);

  const mainStyle: React.CSSProperties = useMemo(
    () => ({
      width: drawerArea ? 'calc(100% - 240px)' : '100%',
    }),
    [drawerArea],
  );

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
    CheckSession();
  }, [router]);

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
