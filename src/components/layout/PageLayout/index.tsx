import React from 'react';

import Header from '@components/ui/Header';

import { IPageLayoutProps } from '@definitions/layout';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export default function PageLayout(props: IPageLayoutProps) {
  return (
    <div className={styles('container')}>
      <div className={styles('header')}>
        <Header />
      </div>
      <div className={styles('content')}>
        {props.children}
      </div>
    </div>
  );
}
