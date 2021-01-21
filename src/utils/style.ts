import cx from 'classnames';

export const styleImport = (styles: any) => (...classNames: string[]) => {
  const stylesMap = classNames.map((className) => styles[className]);
  return cx(stylesMap);
};
