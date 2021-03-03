import User from '@/models/User';

export const persistStore = async () => {
  await User.persistStore();
};
