import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { IUserAuthState } from '@definitions/user';

import User, { userStore } from '@models/User';

import { useReactiveVar } from '@apollo/client';

interface IUseAuthOptions {
  allowedStates: IUserAuthState[],
}

const defaultOptions = {
  allowedStates: [
    IUserAuthState.GUEST,
    IUserAuthState.LOGGED_IN,
  ],
};

const useAuth = (options: IUseAuthOptions = defaultOptions) => {
  const router = useRouter();
  const token = useReactiveVar(userStore.token);

  const {
    allowedStates,
  } = options;

  const isAuthorized = !!token;

  useEffect(() => {
    (async () => {
      const authState = await User.getAuthState(token);
      if (!allowedStates.includes(authState)) {
        await router.replace('/');
      }
    })();
  }, [token]);

  return isAuthorized;
};

export default useAuth;
