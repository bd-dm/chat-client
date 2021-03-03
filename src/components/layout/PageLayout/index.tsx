import React from 'react';

import Head from 'next/head';

import deepEqual from 'deep-equal';

import { ModalContextProvider } from '@/components/context/ModalContext';
import { NotificationContextProvider } from '@/components/context/NotificationContext';
import Header from '@/components/ui/Header';

import { IPageLayoutProps } from '@/definitions/layout';

import { styleImport } from '@/lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function PageLayout(props: IPageLayoutProps) {
  return (
    <div className={styles('container')}>
      <Head>
        <title>😋</title>
      </Head>
      <ModalContextProvider>
        <NotificationContextProvider>
          <div className={styles('header')}>
            <Header />
          </div>
          <div className={styles('content')}>
            {props.children}
          </div>
        </NotificationContextProvider>
      </ModalContextProvider>
    </div>
  );
}

export default React.memo(PageLayout, deepEqual);
