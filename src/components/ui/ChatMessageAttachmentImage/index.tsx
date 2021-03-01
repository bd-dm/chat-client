import React, { useCallback } from 'react';

import Image from 'next/image';

import deepEqual from 'deep-equal';

import ChatMessageAttachmentModal from '@components/ui/ChatMessageAttachmentModal';

import { IChatMessageAttachmentProps } from '@definitions/ui';

import useModal from '@lib/hooks/useModal';
import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatMessageAttachmentImage(props: IChatMessageAttachmentProps) {
  const { attachments, attachment } = props;
  const [openModal, closeModal] = useModal();

  const onImagePress = useCallback(() => {
    openModal({
      content: (
        <ChatMessageAttachmentModal
          attachments={attachments}
          current={attachment}
          onClosePress={closeModal}
        />
      ),
    });
  }, [attachment.id]);

  return (
    <div
      className={styles('container')}
      onClick={() => {
        onImagePress();
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      <div className={styles('image')}>
        <Image
          alt="attachment"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          src={attachment.uri}
        />
      </div>
    </div>
  );
}

export default React.memo(ChatMessageAttachmentImage, deepEqual);
