import React, { FormEvent, KeyboardEvent } from 'react';

import { ITextInputProps } from '@definitions/ui';

export default function TextInput(props: ITextInputProps) {
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    if (props.onValueChange) {
      props.onValueChange(e.currentTarget.value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && props.onEnterPress) {
      props.onEnterPress();
    }
  };

  return (
    <>
      <input
        name={props.name}
        type="text"
        value={props.value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}
