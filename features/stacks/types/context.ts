import { StackFormDataParams } from "@/common/types/form";
import { Dispatch, SetStateAction } from "react";

export type StackFormContextProps = {
  stackFormData: StackFormDataParams;
  setStackFormData: Dispatch<SetStateAction<StackFormDataParams>>;
};