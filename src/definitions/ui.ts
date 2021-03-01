import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

import { IModalOptions, INotification } from '@definitions/context';
import { ChatMessage, FileUri } from '@definitions/graphql';

export interface ITextInputProps{
  onValueChange?: (text: string) => void;
  onEnterPress?: () => void;
  className?: string;
  value?: string;
  htmlTextInputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export interface ITextAreaProps{
  onValueChange?: (text: string) => void;
  onEnterPress?: () => void;
  className?: string;
  value?: string;
  htmlTextAreaProps?: InputHTMLAttributes<HTMLTextAreaElement>;
}

export interface ITextInputChatMessageProps{
  onSend?: () => void;
  text: string;
  attachments: IChatMessageAttachment[];
  onTextChange?: (text: string) => void;
  onAttachmentsChange?: (attachments: File[]) => void;
  isLoading?: boolean;
  textAreaProps?: ITextAreaProps;
}

export interface IFormRowProps {
  label?: string;
  children: ReactNode;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
  isLoading?: boolean;
  onPress?: () => void;
  isFullWidth?: boolean;
}

export interface IButtonFileInputProps{
  children: ReactNode;
  buttonProps?: IButtonProps;
  onFilesChange?: (files: File[]) => void;
}

export interface IChatRoomCardProps {
  onPress?: () => void;
  name: string;
  isActive?: boolean;
}

export interface IChatRoomProps {
  chatRoomId: string;
}

export interface IChatMessagesProps {
  messages: ChatMessage[];
}

export interface IChatMessageAttachment {
  file: File;
  progress: number;
}

export interface IChatMessageProps {
  message: ChatMessage;
}

export interface IChatMessageAttachmentProps {
  attachments: FileUri[];
  attachment: FileUri;
  onPress?: () => void;
}

export interface IChatMessageInputAttachmentProps {
  attachment: IChatMessageAttachment;
  onRemovePress?: () => void;
}

export interface IHeaderMenuItemProps {
  route?: string;
  children: string;
  onPress?: () => void;
}

export interface INotificationProps {
  notification: INotification;
}

export interface IModalProps {
  options: IModalOptions;
}

export interface IModalCommonProps {
  onClosePress?: () => void;
}

export interface IChatMessageAttachmentModalProps extends IModalCommonProps{
  attachments: FileUri[];
  current: FileUri;
}
