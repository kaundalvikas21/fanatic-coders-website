'use client';

import { useEffect, useId, useState } from 'react';
import { FileIcon, LoaderCircle, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { useDropzone, type Accept } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEFAULT_MAX_FILE_SIZE_BYTES,
  formatFileSize,
  getFileRejectionMessage,
  getUploadErrorMessage,
} from '@/modules/uploads/utils/file';

export type FileUploaderProps<TResult = unknown> = {
  accept?: Accept;
  className?: string;
  currentUrl?: string | null;
  disabled?: boolean;
  label?: string;
  maxSizeBytes?: number;
  name?: string;
  onRemove?: () => void | Promise<void>;
  onUpload: (file: File) => Promise<TResult>;
  onUploadSuccess?: (result: TResult) => void;
};

export function FileUploader<TResult = unknown>({
  accept,
  className,
  currentUrl,
  disabled = false,
  label = 'Drop a file here or click to browse',
  maxSizeBytes = DEFAULT_MAX_FILE_SIZE_BYTES,
  name = 'file',
  onRemove,
  onUpload,
  onUploadSuccess,
}: FileUploaderProps<TResult>) {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (!file || !file.type.startsWith('image/')) {
      setPreviewUrl(currentUrl ?? null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [currentUrl, file]);

  const uploadFile = async (acceptedFile: File) => {
    setFile(acceptedFile);
    setError(null);
    setIsUploading(true);

    try {
      const result = await onUpload(acceptedFile);
      onUploadSuccess?.(result);
    } catch (uploadError) {
      setError(getUploadErrorMessage(uploadError));
    } finally {
      setIsUploading(false);
    }
  };

  const { getInputProps, getRootProps, isDragAccept, isDragActive, isDragReject } = useDropzone({
    accept,
    disabled: disabled || isUploading || isRemoving,
    maxFiles: 1,
    maxSize: maxSizeBytes,
    multiple: false,
    onDropAccepted: ([acceptedFile]) => {
      if (acceptedFile) void uploadFile(acceptedFile);
    },
    onDropRejected: (rejections) => setError(getFileRejectionMessage(rejections, maxSizeBytes)),
  });

  const handleRemove = async () => {
    if (!onRemove) {
      setFile(null);
      setPreviewUrl(currentUrl ?? null);
      setError(null);
      return;
    }

    try {
      setIsRemoving(true);
      setError(null);
      await onRemove();
      setFile(null);
      setPreviewUrl(null);
    } catch (removeError) {
      setError(getUploadErrorMessage(removeError));
    } finally {
      setIsRemoving(false);
    }
  };

  const isBusy = isUploading || isRemoving;

  return (
    <div className={cn('space-y-2', className)}>
      <div
        {...getRootProps({
          className: cn(
            'relative flex min-h-36 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/20 p-4 text-center outline-none transition-colors',
            'hover:border-primary/60 hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40',
            isDragAccept && 'border-primary bg-primary/10',
            isDragReject && 'border-destructive bg-destructive/5',
            (disabled || isBusy) && 'cursor-not-allowed opacity-60',
          ),
          'aria-describedby': `${inputId}-help${error ? ` ${inputId}-error` : ''}`,
        })}
      >
        <input {...getInputProps({ id: inputId, name })} />

        {isBusy ? (
          <div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            role="status"
          >
            <LoaderCircle
              className="size-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
            {isRemoving ? 'Removing…' : 'Uploading…'}
          </div>
        ) : previewUrl ? (
          <Image
            src={previewUrl}
            alt="Selected file preview"
            width={640}
            height={360}
            unoptimized
            className="max-h-44 w-auto rounded-lg object-contain"
          />
        ) : file ? (
          <div className="flex min-w-0 flex-col items-center gap-2">
            <FileIcon
              className="size-7 text-primary"
              aria-hidden="true"
            />
            <span className="max-w-full truncate text-sm font-medium">{file.name}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <UploadCloud
              className="size-7 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">{isDragActive ? 'Drop file here' : label}</p>
          </div>
        )}

        {!isBusy && (previewUrl || file) ? (
          <Button
            type="button"
            size="icon-sm"
            variant="destructive"
            className="absolute right-2 top-2"
            aria-label="Remove file"
            onClick={(event) => {
              event.stopPropagation();
              void handleRemove();
            }}
          >
            <X aria-hidden="true" />
          </Button>
        ) : null}
      </div>

      <p
        id={`${inputId}-help`}
        className="text-xs text-muted-foreground"
      >
        Maximum file size: {formatFileSize(maxSizeBytes)}
      </p>

      {error ? (
        <p
          id={`${inputId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
