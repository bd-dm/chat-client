import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

import { INotification } from '@definitions/context';
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
  onSend?: (text: string) => void;
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

export interface IChatRoomCardProps {
  onPress?: () => void;
  name: string;
  isActive?: boolean;
}

export interface IChatMessagesProps {
  chatRoomId: string;
}

export interface IChatMessageProps {
  message: ChatMessage;
}

export interface IChatMessageAttachmentProps {
  attachment: FileUri;
}

export interface IHeaderMenuItemProps {
  route?: string;
  children: string;
  onPress?: () => void;
}

export interface INotificationProps {
  notification: INotification;
}
