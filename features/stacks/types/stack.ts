import { IntrospectionProps } from '@/features/introspections/types/introspection';
import { SkillProps } from '@/features/skills/types/skill';
import { UserProps } from '@/features/users/types/user';

export type StackProps = {
  id: number;
  completed: boolean;
  title: string;
  minutes: number;
  skill: SkillProps;
  description: string;
  user_id?: number;
  introspection?: IntrospectionProps[];
  stacked_at: string;
  created_at: string;
  updated_at: string;
  user: UserProps;
};

export type StackCardProps = {
  stack: StackProps;
};
