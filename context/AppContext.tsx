import { createContext, Dispatch, SetStateAction } from "react";

type AppContextProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<React.SetStateAction<boolean>>;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  formType: string;
  setFormType: Dispatch<React.SetStateAction<string>>;
  formOpen: boolean;
  setFormOpen: Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({
  drawerOpen: true,
  setDrawerOpen: () => {},
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
  anchorEl: null,
  setAnchorEl: () => {},
  handleMenuOpen: () => {},
  handleMenuClose: () => {},
  formType: 'stackCreate',
  setFormType: () => {},
  formOpen: false,
  setFormOpen: () => {}
}) 

export default AppContext