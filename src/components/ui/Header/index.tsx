import React, { useCallback } from 'react';

import deepEqual from 'deep-equal';

import AuthWrapper from '@components/common/AuthWrapper';
import HeaderMenuItem from '@components/ui/HeaderMenuItem';

import { styleImport } from '@lib/utils/style';

import User from '@models/User';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function Header() {
  const onLogoutPress = useCallback(() => {
    User.logout().then();
  }, []);

  return (
    <div className={styles('container')}>
      <AuthWrapper>
        <HeaderMenuItem route="/">
          Home
        </HeaderMenuItem>
        <HeaderMenuItem route="/chat">
          Chat
        </HeaderMenuItem>
        <HeaderMenuItem route="/profile">
          Profile
        </HeaderMenuItem>
      </AuthWrapper>
      <AuthWrapper isForAuth={false}>
        <HeaderMenuItem route="/login">
          Log In
        </HeaderMenuItem>
        <HeaderMenuItem route="/signup">
          Sign Up
        </HeaderMenuItem>
      </AuthWrapper>
      <AuthWrapper>
        <HeaderMenuItem onPress={onLogoutPress}>
          Log Out
        </HeaderMenuItem>
      </AuthWrapper>
    </div>
  );
}

export default React.memo(Header, deepEqual);
