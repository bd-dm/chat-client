import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { IChatMessageInputAttachmentProps } from '@definitions/ui';

import { fileToDataUrl } from '@lib/utils/files';
import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export function ChatMessageInputAttachmentImage(props: IChatMessageInputAttachmentProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const src: string = await fileToDataUrl(props.file);
      setImageSrc(src);
    })();
  }, [props.file]);

  const onRemovePress = () => {
    if (props.onRemovePress) {
      props.onRemovePress();
    }
  };

  return (
    <div className={styles('container')}>
      {imageSrc && (
        <Image
          height={100}
          objectFit="contain"
          src={imageSrc}
          width={100}
        />
      )}
      <div className={styles('overlay')} />
      <div className={styles('name')}>
        {props.file.name}
      </div>
      <a
        className={styles('remove')}
        href="#"
        onClick={onRemovePress}
      >
        &times;
      </a>
    </div>
  );
}
