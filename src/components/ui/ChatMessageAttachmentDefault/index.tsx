import React, { useState } from 'react';

import Image from 'next/image';

import deepEqual from 'deep-equal';
import mime from 'mime-types';

import { IChatMessageAttachmentProps } from '@definitions/ui';

import { fileDownload, filePrintName } from '@lib/utils/files';
import { getExtension } from '@lib/utils/strings';
import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatMessageAttachmentDefault(props: IChatMessageAttachmentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { attachment } = props;

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
      {!!attachment.mime && (
        <>
          <div className={styles('icon')}>
            <Image
              alt={filePrintName(attachment.name)}
              layout="fill"
              objectFit="contain"
              quality={100}
              src={`/assets/mime/${mime.extension(attachment.mime) || getExtension(attachment.name)}.png`}
            />
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
      )}
    </div>
  );
}

export default React.memo(ChatMessageAttachmentDefault, deepEqual);
