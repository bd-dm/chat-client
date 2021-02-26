export const getRandomString = () => Math.random().toString(36).slice(2);

export const stripChars = (str: string): number => parseInt(
  str.replace(/\D/g, ''),
  10,
);
