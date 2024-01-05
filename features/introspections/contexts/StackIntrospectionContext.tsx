import React, { createContext, useState, useMemo } from 'react';
import { ChildrenProps } from '@/common/types/utils';
import { StackIntrospectionContextProps } from '../types/context';
import { IntrospectionProps } from '../types/introspection';

const InitialState: StackIntrospectionContextProps = {
  showStackIntrospection: undefined,
  setShowStackIntrospection: () => {},
};

const StackIntrospectionContext = createContext<StackIntrospectionContextProps>(InitialState);

const StackIntrospectionProvider = ({ children }: ChildrenProps) => {
  const [showStackIntrospection, setShowStackIntrospection] = useState<IntrospectionProps | undefined>(undefined);

  const providerValue = useMemo(() => ({
    showStackIntrospection,
    setShowStackIntrospection,
  }),[showStackIntrospection],);

  return <StackIntrospectionContext.Provider value={providerValue}>{children}</StackIntrospectionContext.Provider>;
};

export { StackIntrospectionProvider, StackIntrospectionContext };
