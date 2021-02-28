import React, { KeyboardEvent } from 'react';

import Button from '@components/ui/Button';
import ButtonFileInput from '@components/ui/ButtonFileInput';
import { ChatMessageInputAttachment } from '@components/ui/ChatMessageInputAttachment';
import TextArea from '@components/ui/TextArea';

import { ITextInputChatMessageProps } from '@definitions/ui';

import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export default function ChatMessageInput(props: ITextInputChatMessageProps) {
  const {
    attachments,
    text,
  } = props;

  const send = () => {
    if (!text) {
      return;
    }

    if (props.onSend) {
      props.onSend();
    }
  };

  const onFilesChange = (items: File[]) => {
    if (props.onAttachmentsChange) {
      props.onAttachmentsChange(items);
    }
  };

  const onFileRemovePress = (idx: number) => () => {
    if (props.onAttachmentsChange) {
      const prev = [...attachments];
      prev.splice(idx, 1);
      props.onAttachmentsChange(prev);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (event.shiftKey || event.ctrlKey) {
        if (props.onTextChange) {
          props.onTextChange(`${text}\n`);
        }
      } else {
        send();
      }
    }
  };

  return (
    <div className={styles('container')}>
      {attachments.length > 0 && (
        <div className={styles('files')}>
          {attachments.map((attachment, idx) => (
            <ChatMessageInputAttachment
              file={attachment}
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
          onValueChange={props.onTextChange}
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
