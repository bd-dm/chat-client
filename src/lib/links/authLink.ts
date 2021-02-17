import User from '@/lib/classes/User';
import { setContext } from '@apollo/client/link/context';

export default setContext(async (_, { headers }) => {
  const token = await User.getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
