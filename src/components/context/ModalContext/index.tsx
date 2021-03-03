import React, { useState } from 'react';

import deepEqual from 'deep-equal';

import Modal from '@/components/ui/Modal';

import {
  IModalContextProviderProps, IModalContextValue, IModalOptions,
} from '@/definitions/context';

const defaultValue = {
  isActive: false,
  content: null,
};

export const ModalContext = React.createContext<IModalContextValue>({
  modalOptions: defaultValue,
  setOptions: () => {},
});

export const ModalContextProvider = React.memo(
  (props: IModalContextProviderProps) => {
    const [options, setOptions] = useState<IModalOptions>(defaultValue);

    return (
      <ModalContext.Provider
        value={{
          modalOptions: options,
          setOptions,
        }}
      >
        {props.children}
        <Modal options={options} />
      </ModalContext.Provider>
    );
  },
  deepEqual,
);
