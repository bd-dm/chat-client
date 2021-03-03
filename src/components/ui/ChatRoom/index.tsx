import React, {
  useCallback, useEffect, useMemo, useRef,
  useState,
} from 'react';

import deepEqual from 'deep-equal';

import { useMutation, useQuery } from '@apollo/client';

import UserQueries from '@/api/graphql/UserQueries';

import Button from '@/components/ui/Button';
import ChatMessageInput from '@/components/ui/ChatMessageInput';
import ChatMessages from '@/components/ui/ChatMessages';

import {
  ChatMessageSendInput,
  Mutation,
  MutationChatMessageSendArgs,
  Query,
} from '@/definitions/graphql';
import { IChatMessageAttachment, IChatRoomProps } from '@/definitions/ui';

import apolloClient from '@/lib/classes/ApiClient';
import { fileExtractName, filePutToUri } from '@/lib/utils/files';
import { styleImport } from '@/lib/utils/style';

import ChatMessageModel from '@/models/ChatMessageModel';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatRoom(props: IChatRoomProps) {
  const [messagesRef, setMessagesRef] = useState<HTMLDivElement | null>(null);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [attachments, setAttachments] = useState<IChatMessageAttachment[]>([]);

  const isScrolled = useRef(false);

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

  const onMessagesScroll = () => {
    if (messagesRef) {
      const maxScroll = messagesRef.scrollHeight - messagesRef.clientHeight;
      const currentScroll = -messagesRef.scrollTop;
      const scrollLeft = maxScroll - currentScroll;

      if (scrollLeft < 100 && !isScrolled.current) {
        isScrolled.current = true;

        loadMore().then();
      }
    }
  };

  useEffect(() => {
    messagesRef?.addEventListener('scroll', onMessagesScroll);

    return () => messagesRef?.removeEventListener('scroll', onMessagesScroll);
  }, [messagesRef]);

  const onMessagesRef = useCallback((node) => {
    if (node !== null) {
      // eslint-disable-next-line no-param-reassign
      node.scrollTop = node.scrollHeight;
    }

    setMessagesRef(node);
  }, []);

  const loadMore = useCallback(async () => {
    if (!data?.chatMessageList.pageMeta.hasMore) {
      return;
    }

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
        names: attachmentFiles.map((file) => fileExtractName(file.name)),
      }),
      fetchPolicy: 'no-cache',
    });

    if (!uploadUris?.data?.chatMessageGetAttachmentUploadUris) {
      return false;
    }

    const filePutPromises = [];
    for (let i = 0; i < attachmentFiles.length; i++) {
      const uri = uploadUris.data.chatMessageGetAttachmentUploadUris[i];
      const file = attachmentFiles.find(
        (el) => fileExtractName(el.name) === uri.name,
      );

      if (!file) {
        continue;
      }

      filePutPromises.push(
        filePutToUri(
          uri,
          file,
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
        <div className={styles('messages')}>
          <ChatMessages messages={messages} />
        </div>
        {pageMeta?.hasMore && (
          <div className={styles('load-more-button')}>
            <Button isLoading={isMoreLoading} isFullWidth onPress={loadMore}>
              Load more
            </Button>
          </div>
        )}
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
