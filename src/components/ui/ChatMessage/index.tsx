import React from 'react';

import Image from 'next/image';

import moment from 'moment';

import { ChatMessageAttachment } from '@components/ui/ChatMessageAttachment';

import { IChatMessageProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export function ChatMessage(props: IChatMessageProps) {
  const { message } = props;

  return (
    <div className={styles('container')}>
      <div className={styles('avatar-wrapper')}>
        <Image
          alt="Chat room"
          layout="fill"
          src="/assets/noavatar.png"
        />
      </div>
      <div className={styles('body')}>
        <div className={styles('header')}>
          <div className={styles('name')}>
            {message.author.email}
          </div>
          <div className={styles('date')}>
            {moment(message.createdAt).fromNow()}
          </div>
        </div>
        <div className={styles('text')}>
          {message.text}
        </div>
        {message.attachments.length > 0 && (
          <div className={styles('attachments')}>
            {message.attachments.map((attachment) => (
              <ChatMessageAttachment
                attachment={attachment}
                key={attachment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
