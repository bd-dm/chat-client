import React from 'react';

import { IUserAuthState } from '@definitions/user';

import useAuth from '@lib/hooks/useAuth';

export default function ChatPage() {
  useAuth({
    allowedStates: [IUserAuthState.LOGGED_IN],
  });

  return (
    <div>
      Chat page
    </div>
  );
}
