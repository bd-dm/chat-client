import axios from 'axios';

import { FileUri } from '@definitions/graphql';

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
