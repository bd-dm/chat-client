import { ReactNode } from 'react';

import { Socket } from 'socket.io-client/build/socket';

export interface IContextProviderProps {
  children: ReactNode | ReactNode[];
}

export type ISocketContextSocket = Socket | null;

export interface ISocketContextValue {
  socket: ISocketContextSocket;
  initSocket: () => void;
}

export interface ISocketContextProviderProps extends IContextProviderProps{
}

export interface INotification {
  title: string;
  text: string;
  id?: string;
  duration?: number;
  isEnded?: boolean;
}

export interface INotificationContextValue {
  notifications: INotification[];
  addNotification: (message: INotification) => void;
}

export interface INotificationContextProviderProps extends IContextProviderProps{
}
