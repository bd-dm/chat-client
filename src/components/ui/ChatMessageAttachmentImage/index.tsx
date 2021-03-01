import React from 'react';

import Image from 'next/image';

import deepEqual from 'deep-equal';

import { IChatMessageAttachmentProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

const imgWidth = 200;
const imgHeight = 200;

function ChatMessageAttachmentImage(props: IChatMessageAttachmentProps) {
  const { attachment } = props;

  return (
    <div className={styles('container')}>
      <div className={styles('image')}>
        <Image
          alt="attachment"
          height={imgHeight}
          objectFit="cover"
          objectPosition="center center"
          src={attachment.uri}
          width={imgWidth}
        />
      </div>
    </div>
  );
}

export default React.memo(ChatMessageAttachmentImage, deepEqual);
