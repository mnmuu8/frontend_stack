import { Dispatch, SetStateAction } from "react";

export type OutputFormDataParams = {
  content: string;
};

export type OutputFormContextProps = {
  outputFormData: OutputFormDataParams;
  setOutputFormData: Dispatch<SetStateAction<OutputFormDataParams>>;
};
