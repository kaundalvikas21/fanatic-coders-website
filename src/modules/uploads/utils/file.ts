import axios from 'axios';
import type { FileRejection } from 'react-dropzone';

export const DEFAULT_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getUploadErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as { message?: unknown } | undefined;

    if (typeof response?.message === 'string' && response.message) return response.message;
  }

  return error instanceof Error && error.message ? error.message : 'Upload failed. Try again.';
};

export const getFileRejectionMessage = (rejections: FileRejection[], maxSizeBytes: number) => {
  const code = rejections[0]?.errors[0]?.code;

  if (code === 'file-too-large') return `File must not exceed ${formatFileSize(maxSizeBytes)}.`;
  if (code === 'file-invalid-type') return 'This file type is not supported.';

  return 'Select one valid file.';
};
