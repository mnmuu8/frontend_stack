import React, { MouseEvent, createContext, useState } from 'react';
import { ChildrenProps } from '@/types/utils';
import { AppContextProps } from '@/types/context';

const InitialState: AppContextProps = {
  drawerArea: true,
  setDrawerArea: () => {},
  handleDrawerAreaToggle: () => {},
  anchorEl: null,
  setAnchorEl: () => {},
  handleMenuOpen: () => {},
  handleMenuClose: () => {},
};

const AppContext = createContext<AppContextProps>(InitialState);

const AppProvider = ({ children }: ChildrenProps) => {
  const [drawerArea, setDrawerArea] = useState<boolean>(true);
  const handleDrawerAreaToggle: () => void = () => {
    setDrawerArea(!drawerArea);
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
        drawerArea: drawerArea,
        setDrawerArea: setDrawerArea,
        handleDrawerAreaToggle: handleDrawerAreaToggle,
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
