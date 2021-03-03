import { useContext, useEffect } from 'react';

import { SocketContext } from '@/components/context/SocketContext';

import { ISocketContextSocket } from '@/definitions/context';

const useSocket = (): ISocketContextSocket => {
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    socketContext.initSocket();
  }, []);

  const { socket } = socketContext;

  return socket;
};

export default useSocket;
