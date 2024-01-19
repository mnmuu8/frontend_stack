export type IntrospectionPoint = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type IntrospectionProps =
  | {
      reason: string;
      evaluation: number;
      keeps: IntrospectionPoint[];
      problems: IntrospectionPoint[];
      tries: IntrospectionPoint[];
      id?: number;
      stack_id?: number;
    }
  | undefined;
