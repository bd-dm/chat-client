import React, { useEffect, useState } from 'react';

import { AppProps } from 'next/app';

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
        <Component {...pageProps} />
      </SocketContextProvider>
    </ApolloProvider>
  );
}

export default App;
