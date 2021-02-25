import { ReactNode } from 'react';

export interface IAuthWrapperProps {
  isForAuth?: boolean,
  children: ReactNode | ReactNode[];
}
