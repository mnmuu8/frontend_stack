import { createContext, Dispatch, SetStateAction } from "react";
import { FormType, IntrospectionFormDataParams, IntrospectionProps, sessionUser, TeamFormDataParams, UserFormDataParams } from "@/types/types";

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
  setSessionUser: React.Dispatch<React.SetStateAction<sessionUser>>;
  introspectionFormData: IntrospectionFormDataParams;
  setIntrospectionFormData: Dispatch<SetStateAction<IntrospectionFormDataParams>>,
  isRegisterEvent: boolean;
  setIsRegisterEvent: Dispatch<React.SetStateAction<boolean>>;
  teamFormData: TeamFormDataParams;
  setTeamFormData: Dispatch<React.SetStateAction<TeamFormDataParams>>
  userFormData: UserFormDataParams;
  setUserFormData: Dispatch<React.SetStateAction<UserFormDataParams>>
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
  introspectionFormData: {evaluation: 0, reason: "", keeps: [], problems: [], tries: []},
  setIntrospectionFormData: () => {},
  isRegisterEvent: false,
  setIsRegisterEvent: () => {},
  teamFormData: {name: ""},
  setTeamFormData: () => {},
  userFormData: {role: "", name: "", email: "", profile_content: "",team: {name: ""}},
  setUserFormData: () => {},
}) 

export default AppContext