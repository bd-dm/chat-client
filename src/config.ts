export default {
  isServer: typeof window === 'undefined',
  apiHost: process.env.NEXT_PUBLIC_API_HOST,
};
