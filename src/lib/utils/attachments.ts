import { ATTACHMENT_TYPE, ATTACHMENT_TYPE_MIMES } from '@/consts';

export const getAttachmentType = (mime?: string | null): ATTACHMENT_TYPE => {
  if (!mime) {
    return ATTACHMENT_TYPE.DEFAULT;
  }

  const type = Object.keys(ATTACHMENT_TYPE_MIMES)
    .find((key) => ATTACHMENT_TYPE_MIMES[key].includes(mime));

  return <ATTACHMENT_TYPE>type || ATTACHMENT_TYPE.DEFAULT;
};
