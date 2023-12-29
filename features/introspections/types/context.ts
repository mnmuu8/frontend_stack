import { IntrospectionFormDataParams } from "@/common/types/form";
import { Dispatch, SetStateAction } from "react";
import { IntrospectionProps } from "./introspection";

export type IntrospectionFormContextProps = {
  introspectionFormData: IntrospectionFormDataParams;
  setIntrospectionFormData: Dispatch<SetStateAction<IntrospectionFormDataParams>>;
};

export type StackIntrospectionContextProps = {
  showStackIntrospection: IntrospectionProps;
  setShowStackIntrospection: Dispatch<SetStateAction<IntrospectionProps>>;
};