import config from '@/config';
import authLink from '@/lib/links/authLink';
import errorLink from '@/lib/links/errorLink';
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const link = from([
  errorLink,
  authLink,
  new HttpLink({
    uri: config.apiHost,
  }),
]);

export default new ApolloClient({
  ssrMode: config.isServer,
  link,
  cache: new InMemoryCache(),
});
