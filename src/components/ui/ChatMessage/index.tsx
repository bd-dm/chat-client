import React from 'react';

import Image from 'next/image';

import moment from 'moment';

import { IChatMessageProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export function ChatMessage(props: IChatMessageProps) {
  return (
    <div className={styles('container')}>
      <div className={styles('avatar-wrapper')}>
        <Image
          alt="Chat room"
          layout="fill"
          src="/assets/noavatar.png"
        />
      </div>
      <div className={styles('body')}>
        <div className={styles('header')}>
          <div className={styles('name')}>
            {props.name}
          </div>
          <div className={styles('date')}>
            {moment(props.date).fromNow()}
          </div>
        </div>
        <div className={styles('text')}>
          {props.text}
        </div>
      </div>
    </div>
  );
}
