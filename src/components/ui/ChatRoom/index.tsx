import React, {
  useCallback, useEffect, useMemo,
  useState,
} from 'react';

import deepEqual from 'deep-equal';

import UserQueries from '@api/graphql/UserQueries';

import Button from '@components/ui/Button';
import ChatMessageInput from '@components/ui/ChatMessageInput';
import ChatMessages from '@components/ui/ChatMessages';

import {
  ChatMessageSendInput,
  Mutation,
  MutationChatMessageSendArgs,
  Query,
} from '@definitions/graphql';
import { IChatMessageAttachment, IChatRoomProps } from '@definitions/ui';

import apolloClient from '@lib/classes/ApiClient';
import { filePutToUri } from '@lib/utils/files';
import { styleImport } from '@lib/utils/style';

import ChatMessageModel from '@models/ChatMessageModel';

import stylesFile from './index.module.scss';

import { useMutation, useQuery } from '@apollo/client';

const styles = styleImport(stylesFile);

function ChatRoom(props: IChatRoomProps) {
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

  const loadMore = useCallback(async () => {
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
  }, [props.chatRoomId, messages.length]);

  const resetScroll = useCallback(() => {
    if (messagesRef) {
      messagesRef.scrollTop = messagesRef.scrollHeight;
    }
  }, [messagesRef]);

  useEffect(() => {
    setIsMoreLoading(false);

    resetScroll();
  }, [props.chatRoomId]);

  const setAttachmentProgress = useCallback((idx: number, progress: number) => {
    setAttachments(
      (prev) => prev.map(
        (el, id) => (idx === id ? { ...el, progress } : el),
      ),
    );
  }, []);

  const uploadAttachments = useCallback(async (): Promise<(string | boolean)[] | boolean> => {
    const uploadUris = await apolloClient.query<Pick<Query, 'chatMessageGetAttachmentUploadUris'>>({
      query: UserQueries.chatMessageGetAttachmentUploadUris.query,
      variables: UserQueries.chatMessageGetAttachmentUploadUris.variables({
        count: attachmentFiles.length,
      }),
      fetchPolicy: 'no-cache',
    });

    if (!uploadUris?.data?.chatMessageGetAttachmentUploadUris) {
      return false;
    }

    const filePutPromises = [];
    for (let i = 0; i < attachmentFiles.length; i++) {
      filePutPromises.push(
        filePutToUri(
          uploadUris.data.chatMessageGetAttachmentUploadUris[i],
          attachmentFiles[i],
          (progress) => setAttachmentProgress(i, progress),
        ),
      );
    }

    return Promise.all(filePutPromises);
  }, [attachmentFiles]);

  const sendMessage = useCallback(async () => {
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
    resetScroll();
  }, [messageText, props.chatRoomId, attachments]);

  const onAttachmentsChange = useCallback((files: File[]) => {
    setAttachments(files.map((file) => ({ file, progress: 0 })));
    resetScroll();
  }, []);

  const onMessageTextChange = useCallback((text: string) => {
    setMessageText(text);
  }, []);

  if (error) {
    console.error(error);
    return <p>Ошибка!</p>;
  }

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

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
          <ChatMessages messages={messages} />
        </div>
      </div>
      <div>
        <ChatMessageInput
          attachments={attachments}
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

export default React.memo(ChatRoom, deepEqual);
