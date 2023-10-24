import React from 'react';
import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'

import { AppProvider } from '@/context/AppContext';
import { SessionProvider } from '@/context/SessionContext';
import { FormProvider } from '@/context/FormContext';
import { FormDataProvider } from '@/context/FormDataContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SessionProvider>
        <FormProvider>
          <FormDataProvider>
            <Component {...pageProps} />
          </FormDataProvider>
        </FormProvider>
      </SessionProvider>
    </AppProvider>
  );
}

export default MyApp