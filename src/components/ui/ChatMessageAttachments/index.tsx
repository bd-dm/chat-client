import React, { useMemo } from 'react';

import deepEqual from 'deep-equal';

import ChatMessageAttachment from '@/components/ui/ChatMessageAttachment';

import { FileUri } from '@/definitions/graphql';
import { IChatMessageAttachmentsProps } from '@/definitions/ui';

import { getAttachmentType } from '@/lib/utils/attachments';
import { styleImport } from '@/lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatMessageAttachments(props: IChatMessageAttachmentsProps) {
  const { attachments } = props;

  if (!attachments.length) {
    return null;
  }

  const sortedAttachments = useMemo(
    () => [...attachments].sort(
      (a, b) => getAttachmentType(b.mime).localeCompare(getAttachmentType(a.mime)),
    ),
    [attachments],
  );

  const groupedAttachments = useMemo(() => {
    const attachmentGroups: {[key: string]: FileUri[]} = {};
    sortedAttachments.forEach((attachment) => {
      if (!attachmentGroups[getAttachmentType(attachment.mime)]) {
        attachmentGroups[getAttachmentType(attachment.mime)] = [];
      }

      attachmentGroups[getAttachmentType(attachment.mime)].push(attachment);
    });
    return attachmentGroups;
  }, [sortedAttachments]);

  return (
    <div
      className={styles('container')}
      style={attachments.length === 1 ? {
        maxWidth: 260,
      } : {}}
    >
      {Object.keys(groupedAttachments).map((attachmentGroupKey) => (
        <div className={styles('group')} key={attachmentGroupKey}>
          {groupedAttachments[attachmentGroupKey].map((attachment) => (
            <ChatMessageAttachment
              attachment={attachment}
              attachments={sortedAttachments}
              key={attachment.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default React.memo(ChatMessageAttachments, deepEqual);
