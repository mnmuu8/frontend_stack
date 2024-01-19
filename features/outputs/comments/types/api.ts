import { ApiOptions } from "@/common/types/api";
import { SetErrorMessages } from "@/common/types/validator";
import { SessionData } from "@/features/sessions/types/session";
import { OutputCommentFormDataParams } from "@/common/types/form";

export type CreateOutputCommentProps = SetErrorMessages & {
  options: ApiOptions;
  sessionData: SessionData;
  outputCommentFormData: OutputCommentFormDataParams;
}
