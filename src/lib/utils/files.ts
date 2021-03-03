import axios from 'axios';
import jsFileDownload from 'js-file-download';

import { FileUri } from '@/definitions/graphql';

import { getExtension, removeExtension, sliceWithDots } from '@/lib/utils/strings';

export const fileGetReader = (
  onCompleted: (result: FileReader['result']) => void,
  onError: (e: Error) => void,
): FileReader => {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e?.target?.result) {
      onCompleted(e.target.result);
    } else {
      onError(new Error('Wrong file'));
    }
  };
  return reader;
};

export const fileToDataUrl = async (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = fileGetReader(
      (result) => {
        resolve(result as string);
      },
      (e) => {
        reject(e);
      },
    );
    reader.readAsDataURL(file);
  });

export const fileToArrayBuffer = async (file: File): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = fileGetReader(
      (result) => {
        resolve(result as ArrayBuffer);
      },
      (e) => {
        reject(e);
      },
    );
    reader.readAsArrayBuffer(file);
  });

export const filePutToUri = async (
  fileUri: FileUri,
  file: File,
  onProgress?: (progress: number) => void,
): Promise<string | boolean> => {
  const fileBuffer = await fileToArrayBuffer(file);

  const result = await axios.put(
    fileUri.uri,
    fileBuffer,
    {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          onProgress(
            (progressEvent?.loaded / fileBuffer.byteLength) * 100,
          );
        }
      },
    },
  );

  if (result.status !== 200) {
    return false;
  }

  return fileUri.id;
};

export const fileDownload = async (uri: string, name: string) => {
  const res = await axios.get(uri, {
    responseType: 'blob',
  });

  jsFileDownload(res.data, name);
};

export const fileExtractName = (str: string): string => {
  const origLength = str.length;
  const ext = getExtension(str);
  let slicedName = removeExtension(str).slice(0, 255);

  const slicedLength = slicedName.length;
  if (slicedLength < origLength) {
    slicedName = `${slicedName.slice(0, 255 - ext.length - 1)}.${ext}`;
  }

  return slicedName;
};

export const filePrintName = (name: string, length: number = 30): string => {
  const origLength = name.length;
  const ext = getExtension(name);
  const extLength = ext.length;

  let slicedName = sliceWithDots(name, length);
  const slicedLength = name.slice(0, length).length;

  if (slicedLength < origLength) {
    const slicedCount = origLength - slicedLength;
    if (slicedCount < extLength) {
      slicedName = slicedName.slice(0, -1 * (extLength - slicedCount - 1));
    }
    slicedName = `${slicedName}.${ext}`;
  }

  return slicedName;
};

export const isImageExists = async (path: string) => {
  try {
    const img = new Image();

    return new Promise((resolve) => {
      img.onload = () => {
        resolve(true);
      };

      img.onerror = () => {
        resolve(false);
      };

      img.src = path;
    });
  } catch (err) {
    return false;
  }
};
