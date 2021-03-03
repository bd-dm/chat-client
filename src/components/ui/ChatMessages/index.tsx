import React from 'react';

import deepEqual from 'deep-equal';

import ChatMessage from '@/components/ui/ChatMessage';

import { IChatMessagesProps } from '@/definitions/ui';

import { styleImport } from '@/lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatMessages(props: IChatMessagesProps) {
  const { messages } = props;

  return (
    <>
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
    </>
  );
}

export default React.memo(ChatMessages, deepEqual);
