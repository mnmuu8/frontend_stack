import React, { createContext, useState } from "react";
import { ChildrenProps } from "@/types/utils";
import { sessionUser } from "@/types/session";
import { SessionContextProps } from "@/types/context";

const InitialState: SessionContextProps = {
  sessionUser: undefined,
  setSessionUser: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
}

const SessionContext = createContext<SessionContextProps>(InitialState);

const SessionProvider = ({ children }: ChildrenProps) => {
  const [sessionUser, setSessionUser] = useState<sessionUser>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  return (
    <SessionContext.Provider 
      value={{
        sessionUser: sessionUser,
        setSessionUser: setSessionUser,
        isAdmin: isAdmin,
        setIsAdmin: setIsAdmin
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export { SessionProvider, SessionContext }