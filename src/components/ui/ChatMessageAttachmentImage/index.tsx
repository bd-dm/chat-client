import React from 'react';

import Image from 'next/image';

import { IChatMessageAttachmentProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export default function ChatMessageAttachmentImage(props: IChatMessageAttachmentProps) {
  const { attachment } = props;

  return (
    <div className={styles('container')}>
      <Image
        alt="attachment"
        height={200}
        src={attachment.uri}
        width={200}
      />
    </div>
  );
}
