export enum ATTACHMENT_TYPE {
    DEFAULT = 'DEFAULT',
    IMAGE = 'IMAGE',
}

export interface IAttachmentTypeMimes {
    [key: string]: string[];
}

export const ATTACHMENT_TYPE_MIMES: IAttachmentTypeMimes = {
  [ATTACHMENT_TYPE.IMAGE]: [
    'image/png',
    'image/jpg',
    'image/jpeg',
  ],
};
