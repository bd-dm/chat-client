import React from 'react';

import ChatMessageAttachmentImage from '@components/ui/ChatMessageAttachmentImage';

import { IChatMessageAttachmentProps } from '@definitions/ui';

export function ChatMessageAttachment(props: IChatMessageAttachmentProps) {
  const { attachment } = props;

  switch (attachment.mime) {
    case 'image/png':
      return (
        <ChatMessageAttachmentImage {...props} />
      );
    default: return null;
  }
}
