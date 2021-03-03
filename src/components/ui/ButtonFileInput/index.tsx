import React, { useRef } from 'react';

import deepEqual from 'deep-equal';

import Button from '@/components/ui/Button';

import { IButtonFileInputProps } from '@/definitions/ui';

import { styleImport } from '@/lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

function ButtonFileInput(props: IButtonFileInputProps) {
  const {
    children,
    onFilesChange,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const onButtonPress = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onFilesChange) {
      const files = Array.from(e.target.files || []);
      onFilesChange(files);

      if (inputRef?.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className={styles('container')}>
      <input
        className={styles('files-input')}
        ref={inputRef}
        type="file"
        multiple
        onChange={onFileInputChange}
      />
      <Button {...props.buttonProps} onPress={onButtonPress}>
        {children}
      </Button>
    </div>
  );
}

export default React.memo(ButtonFileInput, deepEqual);
