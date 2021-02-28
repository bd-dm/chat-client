import React from 'react';

import { IButtonProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export default function Button(props: IButtonProps) {
  const {
    isLoading = false,
    children,
    onPress,
    isFullWidth = false,
  } = props;

  const styleList = ['button'];

  if (isFullWidth) {
    styleList.push('button--full-width');
  }

  return (
    <button className={styles(...styleList)} onClick={onPress}>
      {isLoading ? 'Загрузка...' : children}
    </button>
  );
}
