import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import deepEqual from 'deep-equal';

import { IChatMessageInputAttachmentProps } from '@/definitions/ui';

import { fileToDataUrl } from '@/lib/utils/files';
import { styleImport } from '@/lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatMessageInputAttachmentImage(props: IChatMessageInputAttachmentProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const { attachment } = props;

  useEffect(() => {
    (async () => {
      const src: string = await fileToDataUrl(attachment.file);
      setImageSrc(src);
    })();
  }, [attachment.file]);

  const onRemovePress = () => {
    if (props.onRemovePress) {
      props.onRemovePress();
    }
  };

  return (
    <div className={styles('container')}>
      <div className={styles('image')}>
        {imageSrc && (
        <Image
          height={100}
          objectFit="cover"
          src={imageSrc}
          width={100}
        />
        )}
        <div className={styles('overlay')} />
        <div className={styles('name')}>
          ...{attachment.file.name.slice(-9)}
        </div>
        <a
          className={styles('remove')}
          href="#"
          onClick={onRemovePress}
        >
          &times;
        </a>
      </div>
      <div className={styles(...['progress', attachment.progress ? 'progress--active' : ''])}>
        <div
          className={styles('progress-filled')}
          style={{
            width: `${attachment.progress}%`,
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(ChatMessageInputAttachmentImage, deepEqual);
