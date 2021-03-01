import { useContext } from 'react';

import { ModalContext } from '@components/context/ModalContext';

import { IModalContextValue, IModalOptions } from '@definitions/context';

const useModal = (): [IModalContextValue['setOptions'], () => void] => {
  const context = useContext(ModalContext);

  return [
    (options: IModalOptions) => {
      context.setOptions({
        isActive: true,
        ...options,
      });
    },
    () => {
      context.setOptions({
        isActive: false,
        content: null,
      });
    },
  ];
};

export default useModal;
