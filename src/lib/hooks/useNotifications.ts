import { useContext } from 'react';

import { NotificationContext } from '@/components/context/NotificationContext';

import { INotificationContextValue } from '@/definitions/context';

const useNotifications = (): INotificationContextValue['addNotification'] => {
  const notificationContext = useContext(NotificationContext);

  return notificationContext.addNotification;
};

export default useNotifications;
