import React from 'react';
import '../common/styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'

import { AppProvider } from '@/context/AppContext';
import { SessionProvider } from '@/context/SessionContext';
import { FormProvider } from '@/context/FormContext';
import { FormDataProvider } from '@/context/FormDataContext';
import { SnackbarProvider } from '@/context/SnackbarContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SessionProvider>
        <FormProvider>
          <FormDataProvider>
            <SnackbarProvider>
              <Component {...pageProps} />
            </SnackbarProvider>
          </FormDataProvider>
        </FormProvider>
      </SessionProvider>
    </AppProvider>
  );
}

export default MyApp
