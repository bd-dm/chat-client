import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement>{
  onValueChange?: (text: string) => void;
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
}

export interface IChatMessagesProps {
  chatRoomId: string;
}

export interface IChatMessageProps {
  name: string;
  text: string;
  date: Date;
}
