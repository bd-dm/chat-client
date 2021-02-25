import { ReactNode } from 'react';

import { Socket } from 'socket.io-client/build/socket';

export type ISocketContextSocket = Socket | null;

export interface ISocketContextValue {
  socket: ISocketContextSocket;
  initSocket: () => void;
}

export interface ISocketContextProviderProps {
  children: ReactNode | ReactNode[];
}
