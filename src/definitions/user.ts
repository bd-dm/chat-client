import { User } from '@definitions/graphql';

export enum IUserAuthState {
  GUEST,
  LOGGED_IN,
}

export interface IUseUser {
  user?: User | null;
  isAuthorized: boolean;
}
