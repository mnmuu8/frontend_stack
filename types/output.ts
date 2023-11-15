export type OutputProps = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export type CommentProps = {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

export type OutputsProps = {
  outputs: OutputProps[];
}

export type OutputCardProps = {
  output: OutputProps;
  initialComments?: CommentProps[];
}
