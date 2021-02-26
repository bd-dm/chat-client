import React, { KeyboardEvent, useState } from 'react';

import Button from '@components/ui/Button';
import TextArea from '@components/ui/TextArea';

import { ITextInputChatMessageProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export default function TextAreaChatMessage(props: ITextInputChatMessageProps) {
  const [text, setText] = useState('');

  const send = () => {
    setText('');
    if (props.onSend) {
      props.onSend(text);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (event.shiftKey || event.ctrlKey) {
        setText((prevState) => `${prevState}\n`);
      } else {
        send();
      }
    }
  };

  return (
    <div className={styles('container')}>
      <TextArea
        className={styles('message-input')}
        htmlTextAreaProps={{
          onKeyDown: handleKeyDown,
          placeholder: 'Введите сообщение...',
        }}
        value={text}
        onValueChange={setText}
        {...props.textAreaProps}
      />
      <Button
        isLoading={props.isLoading}
        onPress={send}
      >
        Отправить
      </Button>
    </div>
  );
}
