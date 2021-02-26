import React from 'react';

import Link from 'next/link';

import { IHeaderMenuItemProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export default function HeaderMenuItem(props: IHeaderMenuItemProps) {
  const renderMenuItem = () => (
    <div
      className={styles('menu-item')}
      onClick={(e) => {
        if (props.onPress) {
          e.preventDefault();

          props.onPress();
        }
      }}
    >
      <a href={props.route}>
        {props.children}
      </a>
    </div>
  );

  if (props.route) {
    return (
      <Link href={props.route}>
        {renderMenuItem()}
      </Link>
    );
  }

  return renderMenuItem();
}
