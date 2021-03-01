import React from 'react';

import deepEqual from 'deep-equal';

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
    default: return null;
  }
}

export default React.memo(ChatMessageInputAttachment, deepEqual);
