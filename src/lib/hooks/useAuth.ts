import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { IUserAuthState } from '@definitions/user';

import User, { userStore } from '@models/User';

import { useReactiveVar } from '@apollo/client';

interface IUseAuthOptions {
  allowedStates: IUserAuthState[],
}

const useAuth = (options: IUseAuthOptions) => {
  const router = useRouter();
  const token = useReactiveVar(userStore.token);

  const {
    allowedStates = [
      IUserAuthState.GUEST,
      IUserAuthState.LOGGED_IN,
    ],
  } = options;

  useEffect(() => {
    (async () => {
      const authState = await User.getAuthState(token);
      if (!allowedStates.includes(authState)) {
        await router.replace('/');
      }
    })();
  }, [token]);
};

export default useAuth;
