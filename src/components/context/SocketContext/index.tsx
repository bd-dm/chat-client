import React, { useEffect, useState } from 'react';

import deepEqual from 'deep-equal';
import { io } from 'socket.io-client';

import { useReactiveVar } from '@apollo/client';

import { ISocketContextProviderProps, ISocketContextSocket, ISocketContextValue } from '@/definitions/context';

import useAuth from '@/lib/hooks/useAuth';

import { userStore } from '@/models/User';

import config from '@/config';

export const socketContextDefaultValue: ISocketContextValue = {
  socket: null,
  initSocket: () => {},
};

export const SocketContext = React.createContext<ISocketContextValue>(socketContextDefaultValue);

export const SocketContextProvider = React.memo(
  (props: ISocketContextProviderProps) => {
    const [socket, setSocket] = useState<ISocketContextSocket>(null);
    const userToken = useReactiveVar(userStore.token);
    const isAuthorized = useAuth();

    useEffect(() => {
      if (socket) {
      socket?.disconnect();
      setSocket(null);

      initSocket();
      }
    }, [isAuthorized]);

    useEffect(() => {
      if (socket) {
        socket.on('error', () => {
          console.error(`socket error: ${socket.id}`);
        });
      }
    }, [socket]);

    const initSocket = () => {
      if (socket?.connected || !!socket) {
        return;
      }

      const newSocket = io(config.apiSocketHost, {
        path: config.apiSocketPath,
        auth: { token: userToken },
      });

      setSocket(newSocket);
    };

    return (
      <SocketContext.Provider
        value={{
          initSocket,
          socket,
        }}
      >
        {props.children}
      </SocketContext.Provider>
    );
  },
  deepEqual,
);
