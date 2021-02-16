import React, { FormEvent } from 'react';

import { ITextInputProps } from '@/definitions/ui';

export default function TextInput(props: ITextInputProps) {
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    if (props.onValueChange) {
      props.onValueChange(e.currentTarget.value);
    }
  };

  return (
    <>
      <input type="text" onChange={onChange} />
    </>
  );
}
