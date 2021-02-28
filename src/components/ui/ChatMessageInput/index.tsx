import React, { KeyboardEvent, useState } from 'react';

import Button from '@components/ui/Button';
import ButtonFileInput from '@components/ui/ButtonFileInput';
import { ChatMessageInputAttachment } from '@components/ui/ChatMessageInputAttachment';
import TextArea from '@components/ui/TextArea';

import { ITextInputChatMessageProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export default function ChatMessageInput(props: ITextInputChatMessageProps) {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const send = () => {
    setText('');
    setFiles([]);
    if (props.onSend) {
      props.onSend(text, files);
    }
  };

  const onFilesChange = (items: File[]) => {
    setFiles(items);
    if (props.onAttachmentsChanged) {
      props.onAttachmentsChanged(items);
    }
  };

  const onFileRemovePress = (idx: number) => () => {
    setFiles((prevState) => {
      const prev = [...prevState];
      prev.splice(idx, 1);
      return prev;
    });
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
      {files.length > 0 && (
        <div className={styles('files')}>
          {files.map((file, idx) => (
            <ChatMessageInputAttachment
              file={file}
              key={idx}
              onRemovePress={onFileRemovePress(idx)}
            />
          ))}
        </div>
      )}
      <div className={styles('input-container')}>
        <ButtonFileInput
          onFilesChange={onFilesChange}
        >
          Прикрепить файл
        </ButtonFileInput>
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
    </div>
  );
}
