import React, { useState } from 'react';
import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AppContext from '@/context/AppContext';

function MyApp({ Component, pageProps }: AppProps) {

  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true);
  const handleDrawerOpen: () => void = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose: () => void = () => {
    setDrawerOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose: () => void = () => {
    setAnchorEl(null);
  };

  const [formOpen, setFormOpen] = React.useState<boolean>(false);
  const [formType, setFormType] = React.useState<string>('stackCreate');

  return (
    <AppContext.Provider 
      value={{
        drawerOpen: drawerOpen,
        setDrawerOpen: setDrawerOpen,
        handleDrawerOpen: handleDrawerOpen,
        handleDrawerClose: handleDrawerClose,
        anchorEl: anchorEl,
        setAnchorEl: setAnchorEl,
        handleMenuOpen: handleMenuOpen,
        handleMenuClose: handleMenuClose,
        formType: formType,
        setFormType: setFormType,
        formOpen: formOpen,
        setFormOpen: setFormOpen
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AppContext.Provider>
  );
}

export default MyApp