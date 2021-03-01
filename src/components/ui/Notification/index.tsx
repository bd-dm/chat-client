import React, { useCallback, useState } from 'react';

import deepEqual from 'deep-equal';

import { INotificationProps } from '@definitions/ui';

import { stripChars } from '@lib/utils/strings';
import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function Notification(props: INotificationProps) {
  const [height, setHeight] = useState(0);

  const {
    notification,
  } = props;

  const onClosePress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
  };

  const onRef = useCallback((node) => {
    if (node !== null) {
      const computedStyle = window.getComputedStyle(node);
      setHeight(node.getBoundingClientRect().height + stripChars(computedStyle.marginBottom));
    }
  }, []);

  return (
    <div
      className={styles('notification', !notification.isEnded ? 'notification--showed' : '')}
      ref={onRef}
      style={height ? {
        marginTop: `-${height}px`,
      } : {}}
    >
      <div className={styles('body')}>
        <p className={styles('title')}>
          {notification.title}
        </p>
        <p className={styles('text')}>
          {notification.text}
        </p>
      </div>
      <a
        className={styles('close-button')}
        href="#"
        onClick={onClosePress}
      >
        &times;
      </a>
    </div>
  );
}

export default React.memo(Notification, deepEqual);
