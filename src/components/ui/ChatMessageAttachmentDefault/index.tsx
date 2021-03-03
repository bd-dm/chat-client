import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import deepEqual from 'deep-equal';
import mime from 'mime-types';

import { IChatMessageAttachmentProps } from '@/definitions/ui';

import { fileDownload, filePrintName, isImageExists } from '@/lib/utils/files';
import { getExtension } from '@/lib/utils/strings';
import { styleImport } from '@/lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatMessageAttachmentDefault(props: IChatMessageAttachmentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { attachment } = props;

  useEffect(() => {
    (
      async () => {
        const fileName = mime.extension(attachment.mime || '') || getExtension(attachment.name);
        const filePathDefault = '/assets/mime/default.png';
        const filePath = `/assets/mime/${fileName}.png`;

        const hasAccess = await isImageExists(filePath);

        setImgSrc(hasAccess ? filePath : filePathDefault);
      }
    )();
  }, [attachment.id]);

  const onAttachmentPress = async () => {
    setIsLoading(true);
    await fileDownload(attachment.uri, attachment.name);
    setIsLoading(false);
  };

  return (
    <div
      className={styles('container')}
      onClick={() => {
        onAttachmentPress().then();
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      <>
        <div className={styles('icon')}>
          {imgSrc && (
            <Image
              alt={filePrintName(attachment.name)}
              layout="fill"
              objectFit="contain"
              quality={100}
              src={imgSrc}
            />
          )}
        </div>
        <div className={styles('name')}>
          {isLoading
            ? 'Загрузка...' : (
              <>
                {filePrintName(attachment.name, 40)}
              </>
            )}
        </div>
      </>
    </div>
  );
}

export default React.memo(ChatMessageAttachmentDefault, deepEqual);
