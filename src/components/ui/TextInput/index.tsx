import React, { FormEvent, KeyboardEvent } from 'react';

import deepEqual from 'deep-equal';

import { ITextInputProps } from '@/definitions/ui';

function TextInput(props: ITextInputProps) {
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
        className={props.className}
        type="text"
        value={props.value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        {...props.htmlTextInputProps}
      />
    </>
  );
}

export default React.memo(TextInput, deepEqual);
