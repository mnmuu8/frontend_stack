import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/types/utils';
import { sessionUser } from '@/types/session';
import { SessionContextProps } from '@/types/context';

const InitialState: SessionContextProps = {
  sessionUser: undefined,
  setSessionUser: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
};

const SessionContext = createContext<SessionContextProps>(InitialState);

const SessionProvider = ({ children }: ChildrenProps) => {
  const [sessionUser, setSessionUser] = useState<sessionUser>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      sessionUser,
      setSessionUser,
      isAdmin,
      setIsAdmin,
    }),
    [sessionUser, isAdmin],
  );

  return <SessionContext.Provider value={providerValue}>{children}</SessionContext.Provider>;
};

export { SessionProvider, SessionContext };
