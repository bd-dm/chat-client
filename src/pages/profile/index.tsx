import React from 'react';

import UserQueries from '@api/UserQueries';

import { Query } from '@definitions/graphql';
import { IUserAuthState } from '@definitions/user';

import useAuth from '@lib/hooks/useAuth';

import { useQuery } from '@apollo/client';

export default function ProfilePage() {
  useAuth({
    allowedStates: [IUserAuthState.LOGGED_IN],
  });

  const { loading, error, data } = useQuery<Pick<Query, 'userGetCurrent'>>(UserQueries.userGetCurrent);

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      E-Mail: {data?.userGetCurrent?.email}
    </div>
  );
}
