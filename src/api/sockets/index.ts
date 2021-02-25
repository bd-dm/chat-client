import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/socket';

import config from '@config';

export default function initSocketIO(): Socket {
  const socket = io(config.apiSocketHost, {
    path: config.apiSocketPath,
  });

  socket.on('connect', () => {
    console.log(`socket connect: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`socket disconnect: ${socket.id}`); // undefined
  });

  socket.on('error', () => {
    console.error(`socket error: ${socket.id}`); // undefined
  });

  return socket;
}
