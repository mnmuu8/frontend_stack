import React, { createContext, useState } from "react";
import { ChildrenProps } from "@/types/utils";
import { IntrospectionProps } from "@/types/introspection";
import { StackFormDataParams, TeamFormDataParams, UserFormDataParams, IntrospectionFormDataParams } from "@/types/form";
import { FormDataContextProps } from "@/types/context";

const InitialState: FormDataContextProps = {
  teamFormData: {name: ""},
  setTeamFormData: () => {},
  userFormData: {role: "", name: "", email: "", profile_content: "",team: {name: ""}},
  setUserFormData: () => {},
  stackFormData: {skill: "", stacked_at: null, minutes: 0, title: "", description: ""},
  setStackFormData: () => {},
  introspectionFormData: {evaluation: 0, reason: "", keeps: [], problems: [], tries: []},
  setIntrospectionFormData: () => {},
  showStackIntrospection: undefined,
  setShowStackIntrospection: () => {},
}

const FormDataContext = createContext<FormDataContextProps>(InitialState);

const FormDataProvider = ({ children }: ChildrenProps) => {
  const [introspectionFormData, setIntrospectionFormData] = useState<IntrospectionFormDataParams>({evaluation: 0, reason: "", keeps: [], problems: [], tries: []})
  const [teamFormData, setTeamFormData] = useState<TeamFormDataParams>({name: ""})
  const [userFormData, setUserFormData] = useState<UserFormDataParams>({role: "", name: "", email: "", profile_content: "", team: {name: ""}})
  const [stackFormData, setStackFormData] = useState<StackFormDataParams>({skill: "", stacked_at: null, minutes: 0, title: "", description: ""})
  const [showStackIntrospection, setShowStackIntrospection] = useState<IntrospectionProps|undefined>(undefined)

  return (
    <FormDataContext.Provider 
      value={{
        teamFormData: teamFormData,
        setTeamFormData: setTeamFormData,
        userFormData: userFormData,
        setUserFormData: setUserFormData,
        stackFormData: stackFormData,
        setStackFormData: setStackFormData,
        introspectionFormData: introspectionFormData,
        setIntrospectionFormData: setIntrospectionFormData,
        showStackIntrospection: showStackIntrospection,
        setShowStackIntrospection: setShowStackIntrospection,
      }}
    >
      {children}
    </FormDataContext.Provider>
  )
}

export { FormDataProvider, FormDataContext }