import React, { createContext, useState } from "react";
import { ChildrenProps } from "@/types/utils";
import { sessionUser } from "@/types/session";
import { SessionContextProps } from "@/types/context";

const InitialState: SessionContextProps = {
  sessionUser: undefined,
  setSessionUser: () => {},
}

const SessionContext = createContext<SessionContextProps>(InitialState);

const SessionProvider = ({ children }: ChildrenProps) => {
  const [sessionUser, setSessionUser] = useState<sessionUser>(undefined);

  return (
    <SessionContext.Provider 
      value={{
        sessionUser: sessionUser,
        setSessionUser: setSessionUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export { SessionProvider, SessionContext }