import React from 'react';

import UserQueries from '@api/UserQueries';

import { Query } from '@/definitions/graphql';
import { useQuery } from '@apollo/client';

export default function ProfilePage() {
  const { loading, error, data } = useQuery<Pick<Query, 'getCurrentUser'>>(UserQueries.getCurrentUser);

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}
