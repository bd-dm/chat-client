import { useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';

import UserQueries from '@/api/graphql/UserQueries';

import { Query } from '@/definitions/graphql';
import { IUseUser } from '@/definitions/user';

import useAuth from '@/lib/hooks/useAuth';

const useUser = (): IUseUser => {
  const isAuthorized = useAuth();

  const [userGetCurrent, { data }] = useLazyQuery<Pick<Query, 'userGetCurrent'>>(UserQueries.userGetCurrent.query);
  useEffect(() => {
    userGetCurrent();
  }, [isAuthorized]);

  return {
    isAuthorized,
    user: data?.userGetCurrent,
  };
};

export default useUser;
