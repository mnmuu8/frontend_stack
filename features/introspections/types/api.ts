import { ApiOptions } from "@/common/types/api";
import { IntrospectionFormDataParams } from "./context";
import { SetErrorMessages } from "@/common/types/validator";

export type IntrospectionApiProps = SetErrorMessages & {
  options: ApiOptions;
  introspectionFormData: IntrospectionFormDataParams;
}

export type CreateIntrospectionProps = IntrospectionApiProps;
export type UpdateIntrospectionProps = IntrospectionApiProps;
