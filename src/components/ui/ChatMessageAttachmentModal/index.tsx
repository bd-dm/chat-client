import React from 'react';

import deepEqual from 'deep-equal';

import ChatMessageAttachmentModalImage from '@/components/ui/ChatMessageAttachmentModalImage';

import { IChatMessageAttachmentModalProps } from '@/definitions/ui';

import { getAttachmentType } from '@/lib/utils/attachments';

import { ATTACHMENT_TYPE } from '@/consts';

function ChatMessageAttachmentModal(props: IChatMessageAttachmentModalProps) {
  const {
    current,
  } = props;

  switch (getAttachmentType(current.mime)) {
    case ATTACHMENT_TYPE.IMAGE:
      return (<ChatMessageAttachmentModalImage {...props} />);
    case ATTACHMENT_TYPE.DEFAULT:
      return null;
  }
}

export default React.memo(ChatMessageAttachmentModal, deepEqual);
