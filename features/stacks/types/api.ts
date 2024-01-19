import { ApiOptions } from "@/common/types/api";
import { SessionData } from "@/features/sessions/types/session";
import { SetErrorMessages } from "@/common/types/validator";
import { StackFormDataParams } from "@/common/types/form";

export type callCreateStackProps = SetErrorMessages & {
  options: ApiOptions;
  sessionData: SessionData;
  stackFormData: StackFormDataParams;
}