import React, { useState } from 'react';
import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AppContext from '@/context/AppContext';

function MyApp({ Component, pageProps }: AppProps) {

  const [drawerOpen, setDrawerOpen] = useState(true);
  const handleDrawerOpen: () => void = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose: () => void = () => {
    setDrawerOpen(false);
  };

  return (
    <AppContext.Provider 
      value={{
        drawerOpen: drawerOpen,
        setDrawerOpen: setDrawerOpen,
        handleDrawerOpen: handleDrawerOpen,
        handleDrawerClose: handleDrawerClose
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AppContext.Provider>
  );
}

export default MyApp