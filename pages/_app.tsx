import React from 'react';
import '../common/styles/style.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'

import { AppProvider } from '@/context/AppContext';
import { SessionProvider } from '@/context/SessionContext';
import { FormProvider } from '@/context/FormContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { StackIntrospectionProvider } from '@/features/introspections/contexts/StackIntrospectionContext';
import { IntrospectionFormProvider } from '@/features/introspections/contexts/IntrospectionFormContext';
import { TeamFormProvider } from '@/features/teams/contexts/TeamFormContext';
import { InviteTeamFormProvider } from '@/features/teams/contexts/InviteTeamFormContext';
import { OutputFormProvider } from '@/features/outputs/contexts/OutputFormContext';
import { OutputCommentFormProvider } from '@/features/outputs/comments/contexts/OutputCommentFormContext';
import { StackFormProvider } from '@/features/stacks/contexts/StackFormContext';
import { UserFormProvider } from '@/features/users/contexts/UserFormContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SessionProvider>
        <FormProvider>
          <StackFormProvider>
            <UserFormProvider>
              <StackIntrospectionProvider >
                <IntrospectionFormProvider>
                  <TeamFormProvider>
                    <InviteTeamFormProvider>
                      <OutputFormProvider>
                        <OutputCommentFormProvider>
                          <SnackbarProvider>
                            <Component {...pageProps} />
                          </SnackbarProvider>
                        </OutputCommentFormProvider>
                      </OutputFormProvider>
                    </InviteTeamFormProvider>
                  </TeamFormProvider>
                </IntrospectionFormProvider>
              </StackIntrospectionProvider>
            </UserFormProvider>
          </StackFormProvider>
        </FormProvider>
      </SessionProvider>
    </AppProvider>
  );
}

export default MyApp
