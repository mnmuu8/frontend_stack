import { ApiOptions } from "@/common/types/api";
import { OutputCommentFormDataParams } from "./context";
import { SetErrorMessages } from "@/common/types/validator";
import { SessionData } from "@/features/sessions/types/session";

export type CreateOutputCommentProps = SetErrorMessages & {
  options: ApiOptions;
  sessionData: SessionData;
  outputCommentFormData: OutputCommentFormDataParams;
}
