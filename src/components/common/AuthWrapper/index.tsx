import React from 'react';

import { IAuthWrapperProps } from '@definitions/common';

import useAuth from '@lib/hooks/useAuth';

export default function AuthWrapper(props: IAuthWrapperProps) {
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
