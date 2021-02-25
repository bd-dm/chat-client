import React, { useState } from 'react';

import initSocketIO from '@api/sockets';

import { ISocketContextProviderProps, ISocketContextSocket, ISocketContextValue } from '@definitions/context';

export const socketContextDefaultValue: ISocketContextValue = {
  socket: null,
  initSocket: () => {},
};

export const SocketContext = React.createContext<ISocketContextValue>(socketContextDefaultValue);

export const SocketContextProvider = (props: ISocketContextProviderProps) => {
  const [socket, setSocket] = useState<ISocketContextSocket>(null);

  const initSocket = () => {
    if (socket?.connected || !!socket) {
      return;
    }

    const newSocket = initSocketIO();

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
