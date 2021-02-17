import React, { useCallback } from 'react';

import Link from 'next/link';

import User from '@models/User';

export default function IndexPage() {
  const onLogoutPress = useCallback(() => {
    User.logout().then();
  }, []);

  return (
    <div>
      <p>
        Hello world!
      </p>
      <p>
        <Link href="/chat">
          <a>Chat</a>
        </Link>
      </p>
      <p>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </p>
      <p>
        <Link href="/login">
          <a>Log In</a>
        </Link>
      </p>
      <p>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </p>
      <p>
        <a href="#" onClick={() => onLogoutPress()}>Log Out</a>
      </p>
    </div>
  );
}
