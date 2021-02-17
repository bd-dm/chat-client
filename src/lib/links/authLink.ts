import User from '@/lib/classes/User';
import { setContext } from '@apollo/client/link/context';

export default setContext((_, { headers }) => {
  const token = User.getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
