import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import deepEqual from 'deep-equal';

import { useQuery } from '@apollo/client';

import UserQueries from '@/api/graphql/UserQueries';

import ChatRoom from '@/components/ui/ChatRoom';
import ChatRoomCard from '@/components/ui/ChatRoomCard';

import { ChatMessage, ChatRoom as ChatRoomType, Query } from '@/definitions/graphql';
import { IChatPageQuery } from '@/definitions/pages';
import { ISocketEvents } from '@/definitions/socket';
import { IUserAuthState } from '@/definitions/user';

import apolloClient from '@/lib/classes/ApiClient';
import useAuth from '@/lib/hooks/useAuth';
import useNotifications from '@/lib/hooks/useNotifications';
import useSocket from '@/lib/hooks/useSocket';
import useUser from '@/lib/hooks/useUser';
import { styleImport } from '@/lib/utils/style';

import ChatMessageModel from '@/models/ChatMessageModel';
import ChatRoomModel from '@/models/ChatRoomModel';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatPage() {
  useAuth({
    allowedStates: [IUserAuthState.LOGGED_IN],
  });
  const notification = useNotifications();

  const socket = useSocket();
  const router = useRouter();
  const { user } = useUser();

  const { id: chatId } = router.query as IChatPageQuery;
  const { loading, error, data } = useQuery<Pick<Query, 'chatList'>>(UserQueries.chatList.query);

  const chatOnNewMessage = async (message: ChatMessage) => {
    const chatMessageModel = new ChatMessageModel(apolloClient);
    await chatMessageModel.addLocalMessages(message.chatRoom.id, [message]);

    if (
      user?.id !== message.author.id
      && message.chatRoom.id !== chatId
    ) {
      notification({
        text: message.text,
        title: message.author.email,
      });
    }
  };

  const chatOnNewRoom = async (room: ChatRoomType) => {
    const chatRoomModel = new ChatRoomModel(apolloClient);
    await chatRoomModel.addLocalRoom(room);
  };

  useEffect(() => {
    if (socket) {
      socket.on(
        ISocketEvents.CHAT_NEW_MESSAGE,
        chatOnNewMessage,
      );
      socket.on(
        ISocketEvents.CHAT_NEW_ROOM,
        chatOnNewRoom,
      );

      return () => {
        socket.off(
          ISocketEvents.CHAT_NEW_MESSAGE,
          chatOnNewMessage,
        );
        socket.off(
          ISocketEvents.CHAT_NEW_ROOM,
          chatOnNewRoom,
        );
      };
    }
  }, [socket, user, chatId]);

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
            isActive={room.id === chatId}
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

export default React.memo(ChatPage, deepEqual);
