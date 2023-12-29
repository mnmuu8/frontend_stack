import { OutputFormDataParams } from "@/common/types/form";
import { Dispatch, SetStateAction } from "react";

export type OutputFormContextProps = {
  outputFormData: OutputFormDataParams;
  setOutputFormData: Dispatch<SetStateAction<OutputFormDataParams>>;
};