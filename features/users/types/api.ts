import { ApiOptions } from "@/common/types/api";
import { UserFormDataParams } from "@/common/types/form";
import { SetErrorMessages } from "@/common/types/validator";
import { SessionData } from "@/features/sessions/types/session";

export type callCreateUserProps = SetErrorMessages & {
  options: ApiOptions;
  userFormData: UserFormDataParams;
}

export type callUpdateUserProps = SetErrorMessages & {
  options: ApiOptions;
  sessionData: SessionData;
  userFormData: UserFormDataParams;
}
