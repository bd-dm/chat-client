import React from 'react';

import { ChatMessageInputAttachmentImage } from '@components/ui/ChatMessageInputAttachmentImage';

import { IChatMessageInputAttachmentProps } from '@definitions/ui';

export function ChatMessageInputAttachment(props: IChatMessageInputAttachmentProps) {
  const { attachment } = props;

  switch (attachment.file.type) {
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
      return (
        <ChatMessageInputAttachmentImage {...props} />
      );
    default: return null;
  }
}
