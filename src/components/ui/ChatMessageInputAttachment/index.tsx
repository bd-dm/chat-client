import React from 'react';

import deepEqual from 'deep-equal';

import ChatMessageInputAttachmentDefault from '@components/ui/ChatMessageInputAttachmentDefault';
import ChatMessageInputAttachmentImage from '@components/ui/ChatMessageInputAttachmentImage';

import { IChatMessageInputAttachmentProps } from '@definitions/ui';

function ChatMessageInputAttachment(props: IChatMessageInputAttachmentProps) {
  const { attachment } = props;

  switch (attachment.file.type) {
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
      return (
        <ChatMessageInputAttachmentImage {...props} />
      );
    default:
      return (
        <ChatMessageInputAttachmentDefault {...props} />
      );
  }
}

export default React.memo(ChatMessageInputAttachment, deepEqual);
