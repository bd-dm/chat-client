import React from 'react';

import { useRouter } from 'next/router';

import UserQueries from '@api/UserQueries';

import { ChatRoom } from '@components/ui/ChatRoom';
import { ChatRoomCard } from '@components/ui/ChatRoomCard';

import { Query } from '@definitions/graphql';
import { IChatPageQuery } from '@definitions/pages';
import { IUserAuthState } from '@definitions/user';

import useAuth from '@lib/hooks/useAuth';
import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

import { useQuery } from '@apollo/client';

const styles = styleImport(stylesFile);

export default function ChatPage() {
  useAuth({
    allowedStates: [IUserAuthState.LOGGED_IN],
  });
  const router = useRouter();

  const { id: chatId } = router.query as IChatPageQuery;

  const { loading, error, data } = useQuery<Pick<Query, 'chatList'>>(UserQueries.chatList);

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
