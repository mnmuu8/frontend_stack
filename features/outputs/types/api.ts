import { ApiOptions } from "@/common/types/api";
import { SetErrorMessages } from "@/common/types/validator";
import { OutputFormDataParams } from "./context";

export type CreateOutputProps = SetErrorMessages & {
  options: ApiOptions;
  outputFormData: OutputFormDataParams;
}
