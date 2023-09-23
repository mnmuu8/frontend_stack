import { createContext, Dispatch, SetStateAction } from "react";
import { FormType, IntrospectionProps, sessionUser } from "@/types/types";

type AppContextProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<React.SetStateAction<boolean>>;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  formType: FormType;
  setFormType: Dispatch<React.SetStateAction<FormType>>;
  formOpen: boolean;
  setFormOpen: Dispatch<React.SetStateAction<boolean>>;
  showStackIntrospection: IntrospectionProps;
  setShowStackIntrospection: Dispatch<SetStateAction<IntrospectionProps>>;
  sessionUser: sessionUser;
  setSessionUser: React.Dispatch<React.SetStateAction<sessionUser>>
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
  formType: 'createStack',
  setFormType: () => {},
  formOpen: false,
  setFormOpen: () => {},
  showStackIntrospection: undefined,
  setShowStackIntrospection: () => {},
  sessionUser: undefined,
  setSessionUser: () => {},
}) 

export default AppContext