import { Dispatch, SetStateAction } from 'react';
import { SessionUser } from '@/features/sessions/types/session';
import { FormType } from './ui-parts/form';

export type AppContextProps = {
  drawerArea: boolean;
  setDrawerArea: Dispatch<React.SetStateAction<boolean>>;
  handleDrawerAreaToggle: () => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
};

export type SessionContextProps = {
  sessionUser: SessionUser;
  setSessionUser: Dispatch<SetStateAction<SessionUser>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<React.SetStateAction<boolean>>;
};

export type FormContextProps = {
  formType: FormType;
  setFormType: Dispatch<SetStateAction<FormType>>;
  formOpen: boolean;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  isRegisterEvent: boolean;
  setIsRegisterEvent: Dispatch<SetStateAction<boolean>>;
};
