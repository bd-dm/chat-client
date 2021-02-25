export default {
  isServer: typeof window === 'undefined',
  apiGraphqlHost: process.env.NEXT_PUBLIC_API_GRAPHQL_HOST || '',
  apiSocketHost: process.env.NEXT_PUBLIC_API_SOCKET_HOST || '',
  apiSocketPath: process.env.NEXT_PUBLIC_API_SOCKET_PATH || '',
};
