import { useEffect } from 'react';

import UserQueries from '@api/graphql/UserQueries';

import { Query } from '@definitions/graphql';
import { IUseUser } from '@definitions/user';

import useAuth from '@lib/hooks/useAuth';

import { useLazyQuery } from '@apollo/client';

const useUser = (): IUseUser => {
  const isAuthorized = useAuth();

  const [userGetCurrent, { data }] = useLazyQuery<Pick<Query, 'userGetCurrent'>>(UserQueries.userGetCurrent.query);
  useEffect(() => {
    userGetCurrent();
  }, [isAuthorized]);

  console.log('useUser', isAuthorized, data?.userGetCurrent);

  return {
    isAuthorized,
    user: data?.userGetCurrent,
  };
};

export default useUser;
