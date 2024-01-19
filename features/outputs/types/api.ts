import { ApiOptions } from "@/common/types/api";
import { OutputFormDataParams } from "@/common/types/form";
import { SetErrorMessages } from "@/common/types/validator";

export type callCreateOutputProps = SetErrorMessages & {
  options: ApiOptions;
  outputFormData: OutputFormDataParams;
}
