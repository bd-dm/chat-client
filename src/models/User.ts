import { IUserAuthState } from '@definitions/user';

import { makeVar } from '@apollo/client';

const token = makeVar('');

const userStore = {
  token,
};

class User {
  static async persistStore(): Promise<void> {
    token(await User.getToken());
  }

  static async getAuthState(defToken: string | undefined = undefined): Promise<IUserAuthState> {
    const _token = typeof defToken === 'undefined' ? await User.getToken() : defToken;

    if (_token) {
      return IUserAuthState.LOGGED_IN;
    }
    return IUserAuthState.GUEST;
  }

  static async getToken(): Promise<string | undefined> {
    return localStorage.getItem('token') || undefined;
  }

  static async login(_token: string): Promise<void> {
    await localStorage.setItem('token', _token);
    token(_token);
  }

  static async logout(): Promise<void> {
    await localStorage.removeItem('token');
  }
}

export default User;
export {
  userStore,
};
