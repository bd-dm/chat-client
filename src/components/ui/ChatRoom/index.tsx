import React, {
  useCallback, useEffect,
  useState,
} from 'react';

import UserQueries from '@api/graphql/UserQueries';

import { ChatMessage } from '@components/ui/ChatMessage';
import TextAreaChatMessage from '@components/ui/TextAreaChatMessage';

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
  const [messagesRef, setMessagesRef] = useState<HTMLDivElement | null>(null);

  const { loading: isLoading, error, data } = useQuery<Pick<Query, 'chatMessageList'>>(
    UserQueries.chatMessageList.query,
    {
      variables: UserQueries.chatMessageList.variables({
        chatRoomId: props.chatRoomId,
      }),
    },
  );

  const onMessagesRef = useCallback((node) => {
    if (node !== null) {
      // eslint-disable-next-line no-param-reassign
      node.scrollTop = node.scrollHeight;
    }

    setMessagesRef(node);
  }, []);

  useEffect(() => {
    if (messagesRef) {
      messagesRef.scrollTop = messagesRef.scrollHeight;
    }
  }, [data?.chatMessageList.length]);

  const [
    chatMessageSend,
    { loading: isSendLoading },
  ] = useMutation<Pick<Mutation, 'chatMessageSend'>, MutationChatMessageSendArgs>(UserQueries.chatMessageSend.query);

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  const sendMessage = async (text: string) => {
    await chatMessageSend({
      variables: {
        data: {
          chatRoomId: props.chatRoomId,
          text,
        },
      },
    });
  };

  return (
    <div className={styles('container')}>
      <div className={styles('messages')} ref={onMessagesRef}>
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
        <TextAreaChatMessage
          isLoading={isSendLoading}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}
