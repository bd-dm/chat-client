import React, { useEffect } from 'react';

import { AppProps } from 'next/app';

import ApiClient from '@lib/classes/ApiClient';

import { ApolloProvider } from '@apollo/client';
import { persistStore } from '@models';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    persistStore().then();
  });

  return (
    <ApolloProvider client={ApiClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
