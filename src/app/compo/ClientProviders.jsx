'use client';

import { SessionProvider } from 'next-auth/react';
import { IKContext } from 'imagekitio-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!urlEndpoint) {
  throw new Error(
    '❌ Missing ImageKit URL endpoint in env: NEXT_PUBLIC_URL_ENDPOINT'
  );
}

export default function ClientProviders({ children }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <IKContext urlEndpoint={urlEndpoint}>
        {children}
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </IKContext>
    </SessionProvider>
  );
}
