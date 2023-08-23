import { createContext, Dispatch, SetStateAction } from "react";
import { FormType, IntrospectionProps } from "@/types/types";

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
  showStackIntrospection: IntrospectionProps | undefined;
  setShowStackIntrospection: Dispatch<SetStateAction<IntrospectionProps | undefined>>;
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
  setShowStackIntrospection: () => {}
}) 

export default AppContext