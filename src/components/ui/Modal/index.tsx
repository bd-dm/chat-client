import React from 'react';

import deepEqual from 'deep-equal';

import { IModalProps } from '@/definitions/ui';

import { styleImport } from '@/lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function Modal(props: IModalProps) {
  const { options } = props;

  if (!options.isActive) {
    return null;
  }

  return (
    <div className={styles('container')}>
      {options.content}
    </div>
  );
}

export default React.memo(Modal, deepEqual);
