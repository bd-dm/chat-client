import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import authLink from '@/lib/links/authLink';
import errorLink from '@/lib/links/errorLink';

import config from '@/config';

const link = from([
  errorLink,
  authLink,
  new HttpLink({
    uri: config.apiGraphqlHost,
  }),
]);

const apolloClient = new ApolloClient({
  ssrMode: config.isServer,
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;
