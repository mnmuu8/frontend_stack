import { UserFormDataParams } from "@/common/types/form";
import { Dispatch, SetStateAction } from "react";

export type UserFormContextProps = {
  userFormData: UserFormDataParams;
  setUserFormData: Dispatch<SetStateAction<UserFormDataParams>>;
};