import { OutputCommentFormDataParams } from "@/common/types/form";
import { Dispatch, SetStateAction } from "react";

export type OutputCommentFormContextProps = {
  outputCommentFormData: OutputCommentFormDataParams;
  setOutputCommentFormData: Dispatch<SetStateAction<OutputCommentFormDataParams>>;
};