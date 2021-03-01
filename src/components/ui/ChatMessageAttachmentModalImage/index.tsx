import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import deepEqual from 'deep-equal';

import { IChatMessageAttachmentModalProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatMessageAttachmentModalImage(props: IChatMessageAttachmentModalProps) {
  const {
    onClosePress,
    attachments,
    current,
  } = props;

  const [data, setData] = useState(current);

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('keydown', escFunction);

    // @ts-ignore
    return () => window.removeEventListener('keydown', escFunction);
  }, [data.id, attachments.length]);

  const onCloseButtonPress = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (onClosePress) {
      onClosePress();
    }
  };

  const openN = (n: number) => {
    setData(attachments[n]);
  };

  const openNext = () => {
    const currentI = attachments.findIndex((el) => el.id === data.id);
    let nextI = currentI + 1;

    if (attachments.length < nextI + 1) {
      nextI = 0;
    }
    openN(nextI);
  };

  const openPrev = () => {
    const currentI = attachments.findIndex((el) => el.id === data.id);
    let nextI = currentI - 1;

    if (nextI < 0) {
      nextI = attachments.length - 1;
    }
    openN(nextI);
  };

  const escFunction = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && onClosePress) {
      onClosePress();
    } else if (event.key === 'ArrowLeft') {
      openPrev();
    } else if (event.key === 'ArrowRight') {
      openNext();
    }
  };

  return (
    <div className={styles('container')}>
      <a
        className={styles('close-button')}
        href="#"
        onClick={onCloseButtonPress}
      >
        &times;
      </a>
      <div className={styles('image')}>
        <Image
          layout="fill"
          objectFit="contain"
          src={data.uri}
        />
      </div>
      {attachments.length > 1 && (
        <div className={styles('roll')}>
          {attachments.map((attachment) => (
            <div
              className={styles('roll-item')}
              key={attachment.id}
              onClick={() => setData(attachment)}
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={attachment.uri}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(ChatMessageAttachmentModalImage, deepEqual);
