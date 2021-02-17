import React from 'react';

import stylesFile from './index.module.scss';

import { IFormRowProps } from '@/definitions/ui';
import { styleImport } from '@/lib/utils/style';

const styles = styleImport(stylesFile);

export default function FormRow(props: IFormRowProps) {
  return (
    <div className={styles('form-row')}>
      {props.label && (
        <label
          className={styles('label')}
        >
          {props.label}
        </label>
      )}
      {props.children}
    </div>
  );
}
