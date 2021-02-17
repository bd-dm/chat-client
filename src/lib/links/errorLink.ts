import config from '@/config';
import { onError } from '@apollo/client/link/error';

export default onError(({
  graphQLErrors,
  networkError,
}) => {
  if (config.isServer) {
    return;
  }

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      alert(
        `[GraphQL error]: ${message}`,
      );
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
