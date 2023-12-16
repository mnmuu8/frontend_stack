import { IntrospectionProps } from './introspection';
import { SkillProps } from './skill';
import { UserProps } from './user';

export type StackProps = {
  id: number;
  title: string;
  minutes: number;
  skill: SkillProps;
  description: string;
  user_id?: number;
  introspection?: IntrospectionProps[];
  stacked_at: string;
  created_at: string;
  updated_at: string;
  user: UserProps
};

export type StackCardProps = {
  stack: StackProps;
};
