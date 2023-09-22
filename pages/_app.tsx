import React from 'react';
import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'
import AppContext from '@/context/AppContext';
import { FormType, IntrospectionProps, sessionUser } from '@/types/types';

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
  const [formType, setFormType] = React.useState<FormType>('createStack');
  const [showStackIntrospection, setShowStackIntrospection] = React.useState<IntrospectionProps|undefined>(undefined)
  const [sessionUser, setSessionUser] = React.useState<sessionUser>(undefined);

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
        setFormOpen: setFormOpen,
        showStackIntrospection: showStackIntrospection,
        setShowStackIntrospection: setShowStackIntrospection,
        sessionUser: sessionUser,
        setSessionUser: setSessionUser,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp