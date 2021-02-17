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
