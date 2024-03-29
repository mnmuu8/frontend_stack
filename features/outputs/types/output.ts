import { Dispatch, SetStateAction } from "react";
import { UserProps } from "@/features/users/types/user";

export type OutputProps = {
  id: number;
  content: string;
  user: UserProps;
  created_at: string;
  updated_at: string;
};

export type CommentProps = {
  id: number;
  content: string;
  user: UserProps;
  created_at: string;
  updated_at: string;
};

export type OutputsProps = {
  outputs: OutputProps[];
};

export type OutputCardProps = {
  output: OutputProps;
  initialComments?: CommentProps[];
};

export type OutputCommentCardProps = {
  comment: CommentProps;
  outputId: number;
  setComments: Dispatch<SetStateAction<CommentProps[]|undefined>>
};
