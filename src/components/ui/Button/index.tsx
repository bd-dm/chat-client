import React from 'react';

import { IButtonProps } from '@/definitions/ui';

export default function Button(props: IButtonProps) {
  const {
    isLoading = false,
    children,
    onPress,
  } = props;

  return (
    <>
      <button onClick={onPress}>
        {isLoading ? 'Загрузка...' : children}
      </button>
    </>
  );
}
