import '@assets/styles/index.scss';

import React, { useEffect, useState } from 'react';

import { AppProps } from 'next/app';

import PageLayout from '@components/layout/PageLayout';

import ApiClient from '@lib/classes/ApiClient';

import { ApolloProvider } from '@apollo/client';
import { SocketContextProvider } from '@context/SocketContext';
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
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </SocketContextProvider>
    </ApolloProvider>
  );
}

export default App;
