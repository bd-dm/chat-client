import React from 'react';

import deepEqual from 'deep-equal';

import ChatMessageAttachmentDefault from '@components/ui/ChatMessageAttachmentDefault';
import ChatMessageAttachmentImage from '@components/ui/ChatMessageAttachmentImage';

import { IChatMessageAttachmentProps } from '@definitions/ui';

function ChatMessageAttachment(props: IChatMessageAttachmentProps) {
  const { attachment } = props;

  switch (attachment.mime) {
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
      return (
        <ChatMessageAttachmentImage {...props} />
      );
    default:
      return (
        <ChatMessageAttachmentDefault {...props} />
      );
  }
}

export default React.memo(ChatMessageAttachment, deepEqual);
