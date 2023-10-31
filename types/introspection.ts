export type KeepAndProblemAndTryPoint = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type IntrospectionProps = {
  reason: string;
  evaluation: number;
  keeps: KeepAndProblemAndTryPoint[];
  problems: KeepAndProblemAndTryPoint[];
  tries: KeepAndProblemAndTryPoint[];
  id?: number;
  stack_id?: number;
} | undefined;

