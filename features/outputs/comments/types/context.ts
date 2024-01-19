import { Dispatch, SetStateAction } from "react";

export type OutputCommentFormDataParams = {
  content: string;
  outputId: number;
};

export type OutputCommentFormContextProps = {
  outputCommentFormData: OutputCommentFormDataParams;
  setOutputCommentFormData: Dispatch<SetStateAction<OutputCommentFormDataParams>>;
};
