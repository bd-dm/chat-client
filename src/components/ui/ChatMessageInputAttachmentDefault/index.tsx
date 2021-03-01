import React from 'react';

import deepEqual from 'deep-equal';

import { IChatMessageInputAttachmentProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatMessageInputAttachmentDefault(props: IChatMessageInputAttachmentProps) {
  const { attachment } = props;

  const onRemovePress = () => {
    if (props.onRemovePress) {
      props.onRemovePress();
    }
  };

  return (
    <div className={styles('container')}>
      <div className={styles('file')}>
        <div className={styles('name')}>
          [{attachment.file.name.slice(0, 10)}...{attachment.file.name.slice(-10)}]
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

export default React.memo(ChatMessageInputAttachmentDefault, deepEqual);
