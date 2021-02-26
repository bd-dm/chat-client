import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import UserQueries from '@api/graphql/UserQueries';

import { ChatRoom } from '@components/ui/ChatRoom';
import { ChatRoomCard } from '@components/ui/ChatRoomCard';

import { ChatMessage, ChatRoom as ChatRoomType, Query } from '@definitions/graphql';
import { IChatPageQuery } from '@definitions/pages';
import { ISocketEvents } from '@definitions/socket';
import { IUserAuthState } from '@definitions/user';

import apolloClient from '@lib/classes/ApiClient';
import useAuth from '@lib/hooks/useAuth';
import useSocket from '@lib/hooks/useSocket';
import { styleImport } from '@lib/utils/style';

import ChatMessageModel from '@models/ChatMessageModel';
import ChatRoomModel from '@models/ChatRoomModel';

import stylesFile from './index.module.scss';

import { useQuery } from '@apollo/client';

const styles = styleImport(stylesFile);

export default function ChatPage() {
  useAuth({
    allowedStates: [IUserAuthState.LOGGED_IN],
  });

  const socket = useSocket();
  const router = useRouter();

  const { id: chatId } = router.query as IChatPageQuery;
  const { loading, error, data } = useQuery<Pick<Query, 'chatList'>>(UserQueries.chatList.query);

  useEffect(() => {
    if (socket) {
      socket.on(
        ISocketEvents.CHAT_NEW_MESSAGE,
        async (message: ChatMessage) => {
          const chatMessageModel = new ChatMessageModel(apolloClient);
          await chatMessageModel.addLocalMessage(message.chatRoom.id, message);
        },
      );
      socket.on(
        ISocketEvents.CHAT_NEW_ROOM,
        async (room: ChatRoomType) => {
          const chatRoomModel = new ChatRoomModel(apolloClient);
          await chatRoomModel.addLocalRoom(room);
        },
      );
    }
  }, [socket]);

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  const openChatRoom = (id: string) => {
    router.replace(`/chat?id=${id}`).then();
  };

  return (
    <div className={styles('container')}>
      <div className={styles('rooms')}>
        {data?.chatList.map((room) => (
          <ChatRoomCard
            key={room.id}
            name={room.name}
            onPress={() => openChatRoom(room.id)}
          />
        ))}
      </div>
      <div className={styles('messages')}>
        {chatId && <ChatRoom chatRoomId={chatId} />}
      </div>
    </div>
  );
}
