import React, { FormEvent, KeyboardEvent } from 'react';

import deepEqual from 'deep-equal';

import { ITextAreaProps } from '@/definitions/ui';

function TextArea(props: ITextAreaProps) {
  const onChange = (e: FormEvent<HTMLTextAreaElement>) => {
    if (props.onValueChange) {
      props.onValueChange(e.currentTarget.value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && props.onEnterPress) {
      props.onEnterPress();
    }
  };

  return (
    <>
      <textarea
        className={props.className}
        value={props.value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        {...props.htmlTextAreaProps}
      />
    </>
  );
}

export default React.memo(TextArea, deepEqual);
