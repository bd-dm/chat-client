import { setContext } from '@apollo/client/link/context';

import User from '@/models/User';

export default setContext(async (_, { headers }) => {
  const token = await User.getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
