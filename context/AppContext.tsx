import { createContext, Dispatch, SetStateAction } from "react";

type AppContextProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<React.SetStateAction<boolean>>;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const AppContext = createContext<AppContextProps>({
  drawerOpen: true,
  setDrawerOpen: () => {},
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
}) 

export default AppContext