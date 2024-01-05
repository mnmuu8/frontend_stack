import React, { MouseEvent, createContext, useState, useCallback, useMemo } from 'react';
import { ChildrenProps } from '@/common/types/utils';
import { AppContextProps } from '@/common/types/context';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerAreaToggle = () => {
    setDrawerArea(!drawerArea);
  };
  const handleMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const providerValue = useMemo(
    () => ({
      drawerArea,
      setDrawerArea,
      handleDrawerAreaToggle,
      anchorEl,
      setAnchorEl,
      handleMenuOpen,
      handleMenuClose,
    }),
    [drawerArea, anchorEl],
  );

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
