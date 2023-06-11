'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Auth0Provider } from '@auth0/auth0-react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  //ログイン後のリダイレクト先を指定
  const redirectUri = `${process.env["NEXT_PUBLIC_BASE_URL"]}/login`;
  return (
    <Auth0Provider
      domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
      clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
      authorizationParams={{
        audience: process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]!,
        redirect_uri: redirectUri
      }}
    >
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </Auth0Provider>
  );
}
