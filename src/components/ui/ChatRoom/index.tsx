import React, {
  useCallback, useEffect, useMemo,
  useState,
} from 'react';

import UserQueries from '@api/graphql/UserQueries';

import Button from '@components/ui/Button';
import { ChatMessage } from '@components/ui/ChatMessage';
import ChatMessageInput from '@components/ui/ChatMessageInput';

import {
  ChatMessageSendInput,
  Mutation,
  MutationChatMessageSendArgs,
  Query,
} from '@definitions/graphql';
import { IChatMessageAttachment, IChatMessagesProps } from '@definitions/ui';

import apolloClient from '@lib/classes/ApiClient';
import { filePutToUri } from '@lib/utils/files';
import { styleImport } from '@lib/utils/style';

import ChatMessageModel from '@models/ChatMessageModel';

import stylesFile from './index.module.scss';

import { useMutation, useQuery } from '@apollo/client';

const styles = styleImport(stylesFile);

export function ChatRoom(props: IChatMessagesProps) {
  const [messagesRef, setMessagesRef] = useState<HTMLDivElement | null>(null);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [attachments, setAttachments] = useState<IChatMessageAttachment[]>([]);

  const attachmentFiles = useMemo(() => attachments.map((el) => el.file), [attachments]);

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
      resetScroll();
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
    if (messagesRef) {
      messagesRef.scrollTop = messagesRef.scrollHeight;
    }
  };

  useEffect(() => {
    setIsMoreLoading(false);

    resetScroll();
  }, [props.chatRoomId]);

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  const uploadAttachments = async (): Promise<(string | boolean)[] | boolean> => {
    const uploadUris = await apolloClient.query<Pick<Query, 'chatMessageGetAttachmentUploadUris'>>({
      query: UserQueries.chatMessageGetAttachmentUploadUris.query,
      variables: UserQueries.chatMessageGetAttachmentUploadUris.variables({
        count: attachments.length,
      }),
    });

    if (!uploadUris?.data?.chatMessageGetAttachmentUploadUris) {
      return false;
    }

    const filePutPromises = [];
    for (let i = 0; i < attachments.length; i++) {
      filePutPromises.push(
        filePutToUri(
          uploadUris.data.chatMessageGetAttachmentUploadUris[i],
          attachmentFiles[i],
        ),
      );
    }

    return Promise.all(filePutPromises);
  };

  const sendMessage = async () => {
    if (!messageText) {
      return;
    }

    let attachmentIds: (string | boolean)[] | boolean = false;
    if (attachments.length > 0) {
      attachmentIds = await uploadAttachments();
    }

    const variables: ChatMessageSendInput = {
      chatRoomId: props.chatRoomId,
      text: messageText,
    };

    if (attachmentIds && (attachmentIds as Array<string>).length) {
      variables.chatAttachmentIds = attachmentIds as Array<string>;
    }

    await chatMessageSend({
      variables: UserQueries.chatMessageSend.variables(variables),
    });

    setAttachments([]);
    setMessageText('');
  };

  const onAttachmentsChange = (files: File[]) => {
    setAttachments(files.map((file) => ({ file, progress: 0 })));
  };

  const onMessageTextChange = (text: string) => {
    setMessageText(text);
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
      <div>
        <ChatMessageInput
          attachments={attachmentFiles}
          isLoading={isSendLoading}
          text={messageText}
          onAttachmentsChange={onAttachmentsChange}
          onSend={sendMessage}
          onTextChange={onMessageTextChange}
        />
      </div>
    </div>
  );
}
