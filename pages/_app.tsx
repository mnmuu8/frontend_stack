import React from 'react';
import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'
import AppContext from '@/context/AppContext';
import { FormType, IntrospectionFormDataParams, IntrospectionProps, StackFormDataParams, TeamFormDataParams, UserFormDataParams, sessionUser } from '@/types/types';

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

  const [introspectionFormData, setIntrospectionFormData] = React.useState<IntrospectionFormDataParams>({evaluation: 0, reason: "", keeps: [], problems: [], tries: []})
  const [teamFormData, setTeamFormData] = React.useState<TeamFormDataParams>({name: ""})
  const [userFormData, setUserFormData] = React.useState<UserFormDataParams>({role: "", name: "", email: "", profile_content: "", team: {name: ""}})
  const [stackFormData, setStackFormData] = React.useState<StackFormDataParams>({skill: "", stacked_at: null, minutes: 0, title: "", description: ""})

  const [isRegisterEvent, setIsRegisterEvent] = React.useState<boolean>(false);

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
        introspectionFormData: introspectionFormData,
        setIntrospectionFormData: setIntrospectionFormData,
        isRegisterEvent: isRegisterEvent,
        setIsRegisterEvent: setIsRegisterEvent,
        teamFormData: teamFormData,
        setTeamFormData: setTeamFormData,
        userFormData: userFormData,
        setUserFormData: setUserFormData,
        stackFormData: stackFormData,
        setStackFormData: setStackFormData,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp