import React from 'react';

import deepEqual from 'deep-equal';

import { IAuthWrapperProps } from '@definitions/common';

import useAuth from '@lib/hooks/useAuth';

function AuthWrapper(props: IAuthWrapperProps) {
  const {
    isForAuth = true,
  } = props;

  const isAuthorized = useAuth();

  if (isForAuth !== isAuthorized) {
    return null;
  }

  return (
    <>
      {props.children}
    </>
  );
}

export default React.memo(AuthWrapper, deepEqual);
