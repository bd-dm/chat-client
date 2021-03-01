export const getRandomString = () => Math.random().toString(36).slice(2);

export const stripChars = (str: string): number => parseInt(
  str.replace(/\D/g, ''),
  10,
);

export const sliceWithDots = (str: string, length: number): string => {
  const origLength = str.length;
  const sliced = str.slice(0, length);
  const slicedLength = sliced.length;

  return `${sliced}${slicedLength < origLength ? '...' : ''}`;
};

export const getExtension = (str: string) => (`${str}`).split('.').slice(-1).join('');
export const removeExtension = (str: string) => (`${str}`).split('.').slice(0, -1).join('.');
