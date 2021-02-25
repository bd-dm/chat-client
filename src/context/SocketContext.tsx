import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import { ISocketContextProviderProps, ISocketContextSocket, ISocketContextValue } from '@definitions/context';

import config from '@config';

export const socketContextDefaultValue: ISocketContextValue = {
  socket: null,
  initSocket: () => {},
};

export const SocketContext = React.createContext<ISocketContextValue>(socketContextDefaultValue);

export const SocketContextProvider = (props: ISocketContextProviderProps) => {
  const [socket, setSocket] = useState<ISocketContextSocket>(null);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log(`socket connect: ${socket.id}`);
      });

      socket.on('disconnect', () => {
        console.log(`socket disconnect: ${socket.id}`);
        setSocket(null);
      });

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
};
