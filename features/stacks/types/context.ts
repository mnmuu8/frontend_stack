import { Dispatch, SetStateAction } from "react";

export type StackFormDataParams = {
  id?: number;
  skill: string;
  stacked_at: Date;
  minutes: number;
  title: string;
  description: string;
};

export type StackFormContextProps = {
  stackFormData: StackFormDataParams;
  setStackFormData: Dispatch<SetStateAction<StackFormDataParams>>;
};
