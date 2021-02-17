import config from '@/config';
import errorLink from '@/lib/links/errorLink';
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const link = from([
  errorLink,
  new HttpLink({
    uri: config.apiHost,
  }),
]);

export default new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link,
  cache: new InMemoryCache(),
});
