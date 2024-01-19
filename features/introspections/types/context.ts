import { Dispatch, SetStateAction } from "react";
import { IntrospectionPoint, IntrospectionProps } from "./introspection";

export type IntrospectionFormDataParams = {
  reason: string;
  evaluation: number;
  keeps: IntrospectionPoint[];
  problems: IntrospectionPoint[];
  tries: IntrospectionPoint[];
  stack_id?: number;
};

export type IntrospectionFormContextProps = {
  introspectionFormData: IntrospectionFormDataParams;
  setIntrospectionFormData: Dispatch<SetStateAction<IntrospectionFormDataParams>>;
};

export type StackIntrospectionContextProps = {
  showStackIntrospection: IntrospectionProps;
  setShowStackIntrospection: Dispatch<SetStateAction<IntrospectionProps>>;
};
