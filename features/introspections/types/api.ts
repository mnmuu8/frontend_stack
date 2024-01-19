import { ApiOptions } from "@/common/types/api";
import { SetErrorMessages } from "@/common/types/validator";
import { IntrospectionFormDataParams } from "@/common/types/form";

export type IntrospectionApiProps = SetErrorMessages & {
  options: ApiOptions;
  introspectionFormData: IntrospectionFormDataParams;
}

export type callCreateIntrospectionProps = IntrospectionApiProps;
export type callUpdateIntrospectionProps = IntrospectionApiProps;