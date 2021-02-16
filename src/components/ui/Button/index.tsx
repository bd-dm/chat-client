import React from 'react';

import { IButtonProps } from '@/definitions/ui';

export default function Button(props: IButtonProps) {
  return (
    <>
      <button onClick={props.onPress}>
        {props.children}
      </button>
    </>
  );
}
