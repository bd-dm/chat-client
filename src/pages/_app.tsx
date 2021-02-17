import React from 'react';

import { AppProps } from 'next/app';

import ApiClient from '@/lib/classes/ApiClient';
import { ApolloProvider } from '@apollo/client';

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={ApiClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
