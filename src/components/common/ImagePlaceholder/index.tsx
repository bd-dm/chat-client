import React from 'react';

import deepEqual from 'deep-equal';

import { IImagePlaceholderProps } from '@definitions/common';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ImagePlaceholder(props: IImagePlaceholderProps) {
  return (
    <div
      className={styles('container')}
      style={{ width: `${props.width} px`, height: `${props.height} px` }}
    />
  );
}

export default React.memo(ImagePlaceholder, deepEqual);
