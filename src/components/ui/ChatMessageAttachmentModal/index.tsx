import React from 'react';

import deepEqual from 'deep-equal';

import ChatMessageAttachmentModalImage from '@components/ui/ChatMessageAttachmentModalImage';

import { IChatMessageAttachmentModalProps } from '@definitions/ui';

function ChatMessageAttachmentModal(props: IChatMessageAttachmentModalProps) {
  const {
    current,
  } = props;

  switch (current.mime) {
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
      return (<ChatMessageAttachmentModalImage {...props} />);
    default: return null;
  }
}

export default React.memo(ChatMessageAttachmentModal, deepEqual);
