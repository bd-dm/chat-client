import React, { useState } from 'react';

import UserQueries from '@api/graphql/UserQueries';

import Button from '@components/ui/Button';
import { ChatMessage } from '@components/ui/ChatMessage';
import TextInput from '@components/ui/TextInput';

import {
  Mutation,
  MutationChatMessageSendArgs,
  Query,
} from '@definitions/graphql';
import { IChatMessagesProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

import { useMutation, useQuery } from '@apollo/client';

const styles = styleImport(stylesFile);

export function ChatRoom(props: IChatMessagesProps) {
  const [newMessage, setNewMessage] = useState('');

  const { loading: isLoading, error, data } = useQuery<Pick<Query, 'chatMessageList'>>(
    UserQueries.chatMessageList,
    {
      variables: {
        data: {
          chatRoomId: props.chatRoomId,
        },
      },
    },
  );

  const [chatMessageSend, { loading: isSendLoading }] = useMutation<
    Pick<Mutation, 'chatMessageSend'>,
    MutationChatMessageSendArgs
    >(
      UserQueries.chatMessageSend,
    );

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  const sendMessage = async () => {
    await chatMessageSend({
      variables: {
        data: {
          chatRoomId: props.chatRoomId,
          text: newMessage,
        },
      },
    });
  };

  return (
    <div className={styles('container')}>
      <div className={styles('messages')}>
        {!data?.chatMessageList.length
          ? (
            <div className={styles('empty')}>
              No messages yet ☹️
            </div>
          )
          : data?.chatMessageList.map((chatMessage) => (
            <ChatMessage
              date={new Date(chatMessage.createdAt)}
              key={chatMessage.id}
              name={chatMessage.author.email}
              text={chatMessage.text}
            />
          ))}
      </div>
      <div className={styles('input-container')}>
        <TextInput
          value={newMessage}
          onValueChange={setNewMessage}
        />
        <Button isLoading={isSendLoading} onPress={sendMessage}>
          Отправить
        </Button>
      </div>
    </div>
  );
}
