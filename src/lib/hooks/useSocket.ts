import { useContext } from 'react';

import { ISocketContextSocket } from '@definitions/context';

import { SocketContext } from '@context/SocketContext';

const useSocket = (): ISocketContextSocket => {
  const socketContext = useContext(SocketContext);

  socketContext.initSocket();

  const { socket } = socketContext;

  return socket;
};

export default useSocket;
