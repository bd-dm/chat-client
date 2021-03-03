import React from 'react';

import deepEqual from 'deep-equal';

import ChatMessageAttachmentDefault from '@components/ui/ChatMessageAttachmentDefault';
import ChatMessageAttachmentImage from '@components/ui/ChatMessageAttachmentImage';

import { IChatMessageAttachmentProps } from '@definitions/ui';

import { getAttachmentType } from '@lib/utils/attachments';

import { ATTACHMENT_TYPE } from '@consts';

function ChatMessageAttachment(props: IChatMessageAttachmentProps) {
  const { attachment } = props;

  switch (getAttachmentType(attachment.mime)) {
    case ATTACHMENT_TYPE.IMAGE:
      return (
        <ChatMessageAttachmentImage {...props} />
      );
    case ATTACHMENT_TYPE.DEFAULT:
      return (
        <ChatMessageAttachmentDefault {...props} />
      );
  }
}

export default React.memo(ChatMessageAttachment, deepEqual);
