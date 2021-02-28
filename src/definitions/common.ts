import { ReactNode } from 'react';

export interface IAuthWrapperProps {
  isForAuth?: boolean,
  children: ReactNode | ReactNode[];
}

export interface IImagePlaceholderProps {
  width: number;
  height: number;
}
