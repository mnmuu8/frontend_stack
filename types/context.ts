import { Dispatch, SetStateAction } from "react";
import { sessionUser } from "./session";
import { FormType, StackFormDataParams, TeamFormDataParams, UserFormDataParams, IntrospectionFormDataParams, OutputFormDataParams } from "./form";
import { IntrospectionProps } from "./introspection";

export type AppContextProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<React.SetStateAction<boolean>>;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

export type SessionContextProps = {
  sessionUser: sessionUser;
  setSessionUser: Dispatch<SetStateAction<sessionUser>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<React.SetStateAction<boolean>>;
}

export type FormContextProps = {
  formType: FormType;
  setFormType: Dispatch<SetStateAction<FormType>>;
  formOpen: boolean;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  isRegisterEvent: boolean;
  setIsRegisterEvent: Dispatch<SetStateAction<boolean>>;
  isValidate: boolean;
  setIsValidate: Dispatch<SetStateAction<boolean>>;
}

export type FormDataContextProps = {
  teamFormData: TeamFormDataParams;
  setTeamFormData: Dispatch<SetStateAction<TeamFormDataParams>>;
  userFormData: UserFormDataParams;
  setUserFormData: Dispatch<SetStateAction<UserFormDataParams>>;
  stackFormData: StackFormDataParams;
  setStackFormData: Dispatch<SetStateAction<StackFormDataParams>>;
  introspectionFormData: IntrospectionFormDataParams;
  setIntrospectionFormData: Dispatch<SetStateAction<IntrospectionFormDataParams>>;
  showStackIntrospection: IntrospectionProps;
  setShowStackIntrospection: Dispatch<SetStateAction<IntrospectionProps>>;
  outputFormData: OutputFormDataParams;
  setOutputFormData: Dispatch<SetStateAction<OutputFormDataParams>>;
}
