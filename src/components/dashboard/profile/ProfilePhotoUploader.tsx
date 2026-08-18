'use client';

import { useState } from 'react';
import { Camera, LoaderCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { UserAvatar } from '@/components/shared/user-avatar';
import { useOptionalDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { updateAvatar } from '@/modules/uploads/data/avatar';
import {
  DEFAULT_MAX_FILE_SIZE_BYTES,
  getFileRejectionMessage,
  getUploadErrorMessage,
} from '@/modules/uploads/utils/file';
import { useAuth } from '@/providers/AuthProvider';

export function ProfilePhotoUploader() {
  const dialog = useOptionalDialog();
  const { session, refetch } = useAuth();
  const user = session?.user;
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      const response = await updateAvatar(file);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Profile image upload failed.');
      }

      await refetch();
      toast.success('Profile image updated.');
      dialog?.close();
    } catch (uploadError) {
      setError(getUploadErrorMessage(uploadError));
    } finally {
      setIsUploading(false);
    }
  };

  const { getInputProps, open } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    disabled: isUploading,
    maxFiles: 1,
    maxSize: DEFAULT_MAX_FILE_SIZE_BYTES,
    multiple: false,
    noClick: true,
    noDrag: true,
    noKeyboard: true,
    onDropAccepted: ([file]) => {
      if (file) void handleUpload(file);
    },
    onDropRejected: (rejections) =>
      setError(getFileRejectionMessage(rejections, DEFAULT_MAX_FILE_SIZE_BYTES)),
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <UserAvatar
            name={user?.name}
            email={user?.email}
            image={user?.image}
            className="size-32 ring-1 ring-border"
            fallbackClassName="text-3xl"
          />
          {isUploading ? (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-full bg-background/75"
              role="status"
              aria-label="Uploading profile image"
            >
              <LoaderCircle
                className="animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>

        <input {...getInputProps({ name: 'image' })} />
        <Button
          type="button"
          disabled={isUploading}
          onClick={open}
        >
          <Camera data-icon="inline-start" />
          Choose photo
        </Button>
        <p className="text-xs leading-5 text-muted-foreground">
          Upload a JPG, PNG, or WebP file up to 5 MB.
        </p>
      </div>

      {error ? (
        <p
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
