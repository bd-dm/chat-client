import React, {
  useCallback, useEffect, useMemo,
  useState,
} from 'react';

import UserQueries from '@api/graphql/UserQueries';

import Button from '@components/ui/Button';
import { ChatMessage } from '@components/ui/ChatMessage';
import TextAreaChatMessage from '@components/ui/TextAreaChatMessage';

import {
  Mutation,
  MutationChatMessageSendArgs,
  Query,
} from '@definitions/graphql';
import { IChatMessagesProps } from '@definitions/ui';

import apolloClient from '@lib/classes/ApiClient';
import { styleImport } from '@lib/utils/style';

import ChatMessageModel from '@models/ChatMessageModel';

import stylesFile from './index.module.scss';

import { useMutation, useQuery } from '@apollo/client';

const styles = styleImport(stylesFile);

export function ChatRoom(props: IChatMessagesProps) {
  const [messagesRef, setMessagesRef] = useState<HTMLDivElement | null>(null);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const {
    loading: isLoading,
    error,
    data,
    fetchMore,
  } = useQuery<Pick<Query, 'chatMessageList'>>(
    UserQueries.chatMessageList.query,
    {
      variables: UserQueries.chatMessageList.variables({
        chatRoomId: props.chatRoomId,
      }),
    },
  );

  const [
    chatMessageSend,
    { loading: isSendLoading },
  ] = useMutation<Pick<Mutation, 'chatMessageSend'>, MutationChatMessageSendArgs>(UserQueries.chatMessageSend.query);

  const messages = useMemo(
    () => [...(data?.chatMessageList.data || [])].reverse(),
    [data?.chatMessageList.data],
  );
  const pageMeta = useMemo(
    () => data?.chatMessageList.pageMeta,
    [data?.chatMessageList.pageMeta],
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
  }, [messages.length]);

  const loadMore = async () => {
    setIsMoreLoading(true);
    const items: any = await fetchMore({
      variables: UserQueries.chatMessageList.variables({
        chatRoomId: props.chatRoomId,
      }, {
        offset: messages.length,
        limit: 30,
      }),
    });

    if (items?.data?.chatMessageList?.data) {
      const chatMessageModel = new ChatMessageModel(apolloClient);

      await chatMessageModel.addLocalMessages(
        props.chatRoomId,
        items.data.chatMessageList.data,
        true,
      );

      await chatMessageModel.setPageMeta(
        props.chatRoomId,
        items.data.chatMessageList.pageMeta,
      );
    }
    setIsMoreLoading(false);
  };

  const resetScroll = () => {
    setIsMoreLoading(false);

    if (messagesRef) {
      messagesRef.scrollTop = messagesRef.scrollHeight;
    }
  };

  useEffect(() => {
    resetScroll();
  }, [props.chatRoomId]);

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  const sendMessage = async (text: string) => {
    if (!text) {
      return;
    }

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
      <div className={styles('messages-scroll')} ref={onMessagesRef}>
        {pageMeta?.hasMore && (
          <div className={styles('load-more-button')}>
            <Button isLoading={isMoreLoading} isFullWidth onPress={loadMore}>
              Load more
            </Button>
          </div>
        )}
        <div className={styles('messages')}>
          {!messages.length
            ? (
              <div className={styles('empty')}>
                No messages yet ☹️
              </div>
            )
            : messages.map((chatMessage) => (
              <ChatMessage
                key={chatMessage.id}
                message={chatMessage}
              />
            ))}
        </div>
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
