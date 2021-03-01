import React, { useState } from 'react';

import deepEqual from 'deep-equal';

import Notification from '@components/ui/Notification';

import {
  INotification,
  INotificationContextProviderProps,
  INotificationContextValue,
} from '@definitions/context';

import { getRandomString } from '@lib/utils/strings';
import { styleImport } from '@lib/utils/style';

import stylesFile from './index.module.scss';

const styles = styleImport(stylesFile);

export const NotificationContext = React.createContext<INotificationContextValue>({
  notifications: [],
  addNotification: () => {},
});

export const NotificationContextProvider = React.memo(
  (props: INotificationContextProviderProps) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const endNotification = (id: INotification['id']) => {
      setNotifications((prevState) => prevState.map(
        (notif) => (
          notif.id === id
            ? {
              ...notif,
              isEnded: true,
            }
            : notif
        ),
      ));

      setTimeout(() => {
        setNotifications((prevState) => prevState.filter(
          (notif) => notif.id !== id,
        ));
      }, 5000);
    };

    const addNotification = (notification: INotification) => {
      const id = getRandomString();
      const duration = 5000;

      setNotifications((prevState) => [
        ...prevState,
        {
          ...notification,
          id,
          duration,
          isEnded: false,
        },
      ]);

      setTimeout(() => {
        endNotification(id);
      }, duration);
    };

    return (
      <NotificationContext.Provider
        value={{
          notifications,
          addNotification,
        }}
      >
        {props.children}
        <div className={styles('notifications')}>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </NotificationContext.Provider>
    );
  },
  deepEqual,
);
