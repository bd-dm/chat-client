import '@assets/styles/index.scss';

import React, { useEffect, useState } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { NotificationContextProvider } from '@components/context/NotificationContext';
import { SocketContextProvider } from '@components/context/SocketContext';
import PageLayout from '@components/layout/PageLayout';

import ApiClient from '@lib/classes/ApiClient';

import { ApolloProvider } from '@apollo/client';
import { persistStore } from '@models';

function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await persistStore();

      setIsLoading(false);
    })();
  });

  if (isLoading) {
    return <p>Загрузка приложения...</p>;
  }

  return (
    <ApolloProvider client={ApiClient}>
      <SocketContextProvider>
        <NotificationContextProvider>
          <PageLayout>
            <Head>
              <title>😋</title>
            </Head>
            <Component {...pageProps} />
          </PageLayout>
        </NotificationContextProvider>
      </SocketContextProvider>
    </ApolloProvider>
  );
}

export default App;
