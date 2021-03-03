import React from 'react';

import deepEqual from 'deep-equal';

import { IFormRowProps } from '@/definitions/ui';

import { styleImport } from '@/lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function FormRow(props: IFormRowProps) {
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

export default React.memo(FormRow, deepEqual);
