import { ReactNode } from 'react';

import { Socket } from 'socket.io-client/build/socket';

// Socket context

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

// Notification context

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

// Modal context

export interface IModalContextValue {
  modalOptions: IModalOptions;
  setOptions: (options: IModalOptions) => void;
}

export interface IModalContextProviderProps extends IContextProviderProps{
}

export interface IModalOptions {
  content: ReactNode;
  isActive?: boolean;
}
