import React from 'react';

import deepEqual from 'deep-equal';

import { useQuery } from '@apollo/client';

import UserQueries from '@/api/graphql/UserQueries';

import { Query } from '@/definitions/graphql';
import { IUserAuthState } from '@/definitions/user';

import useAuth from '@/lib/hooks/useAuth';

function ProfilePage() {
  useAuth({
    allowedStates: [IUserAuthState.LOGGED_IN],
  });

  const { loading, error, data } = useQuery<Pick<Query, 'userGetCurrent'>>(UserQueries.userGetCurrent.query);

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      id: {data?.userGetCurrent?.id}
      <br />
      E-Mail: {data?.userGetCurrent?.email}
    </div>
  );
}

export default React.memo(ProfilePage, deepEqual);
