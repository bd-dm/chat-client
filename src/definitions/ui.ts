import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

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
  children: string;
  isLoading?: boolean;
  onPress?: () => void;
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
  name: string;
  text: string;
  date: Date;
}

export interface IHeaderMenuItemProps {
  route?: string;
  children: string;
  onPress?: () => void;
}
