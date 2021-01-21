import React from 'react';

import styles from './index.module.scss';

import { styleImport } from '@/utils/style';

const cx = styleImport(styles);

export default function IndexPage() {
  return (
    <div className={cx('page-container')}>
      Hello world!
    </div>
  );
}
