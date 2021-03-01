import React from 'react';

import Image from 'next/image';

import deepEqual from 'deep-equal';

import { IChatRoomCardProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ChatRoomCard(props: IChatRoomCardProps) {
  return (
    <div className={styles('card', props.isActive ? 'card--active' : '')} onClick={props.onPress}>
      <div className={styles('avatar-wrapper')}>
        <Image
          alt="Chat room"
          className={styles('avatar')}
          layout="fill"
          src="/assets/noavatar.png"
        />
      </div>
      <div className={styles('name')}>
        {props.name}
      </div>
    </div>
  );
}

export default React.memo(ChatRoomCard, deepEqual);
