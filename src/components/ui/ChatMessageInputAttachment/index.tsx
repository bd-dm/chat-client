import React from 'react';

import deepEqual from 'deep-equal';

import ChatMessageInputAttachmentDefault from '@components/ui/ChatMessageInputAttachmentDefault';
import ChatMessageInputAttachmentImage from '@components/ui/ChatMessageInputAttachmentImage';

import { IChatMessageInputAttachmentProps } from '@definitions/ui';

import { getAttachmentType } from '@lib/utils/attachments';

import { ATTACHMENT_TYPE } from '@consts';

function ChatMessageInputAttachment(props: IChatMessageInputAttachmentProps) {
  const { attachment } = props;

  switch (getAttachmentType(attachment.file.type)) {
    case ATTACHMENT_TYPE.IMAGE:
      return (
        <ChatMessageInputAttachmentImage {...props} />
      );
    case ATTACHMENT_TYPE.DEFAULT:
      return (
        <ChatMessageInputAttachmentDefault {...props} />
      );
  }
}

export default React.memo(ChatMessageInputAttachment, deepEqual);
