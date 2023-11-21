import React, { MouseEvent, createContext, useState } from 'react';
import { ChildrenProps } from '@/types/utils';
import { AppContextProps } from '@/types/context';

const InitialState: AppContextProps = {
  drawerOpen: true,
  setDrawerOpen: () => {},
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
  anchorEl: null,
  setAnchorEl: () => {},
  handleMenuOpen: () => {},
  handleMenuClose: () => {},
};

const AppContext = createContext<AppContextProps>(InitialState);

const AppProvider = ({ children }: ChildrenProps) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const handleDrawerOpen: () => void = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose: () => void = () => {
    setDrawerOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose: () => void = () => {
    setAnchorEl(null);
  };

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
