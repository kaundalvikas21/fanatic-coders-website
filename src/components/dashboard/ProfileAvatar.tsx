'use client';

import { useState } from 'react';
import { Camera, LoaderCircle, Trash2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { UserAvatar } from '@/components/shared/user-avatar';
import { Button } from '@/components/ui/button';
import { deleteAvatar, updateAvatar } from '@/modules/uploads/data/avatar';
import {
  DEFAULT_MAX_FILE_SIZE_BYTES,
  getFileRejectionMessage,
  getUploadErrorMessage,
} from '@/modules/uploads/utils/file';
import { useAuth } from '@/providers/AuthProvider';

export function ProfileAvatar() {
  const { session, refetch } = useAuth();
  const user = session?.user;
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

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
    } catch (uploadError) {
      setError(getUploadErrorMessage(uploadError));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setError(null);
    setIsRemoving(true);

    try {
      const response = await deleteAvatar();

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Profile image removal failed.');
      }

      await refetch();
      toast.success('Profile image removed.');
    } catch (removeError) {
      setError(getUploadErrorMessage(removeError));
    } finally {
      setIsRemoving(false);
    }
  };

  const isBusy = isUploading || isRemoving;
  const { getInputProps, open } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    disabled: isBusy,
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
    <div className="space-y-5">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center">
        <div className="relative shrink-0">
          <UserAvatar
            name={user?.name}
            email={user?.email}
            image={user?.image}
            className="size-24 ring-1 ring-border"
            fallbackClassName="text-2xl"
          />
          {isBusy && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-full bg-background/75"
              role="status"
              aria-label={isRemoving ? 'Removing profile image' : 'Uploading profile image'}
            >
              <LoaderCircle
                className="size-5 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-3">
          <input {...getInputProps({ name: 'image' })} />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isBusy}
              onClick={open}
            >
              <Camera data-icon="inline-start" />
              {user?.image ? 'Change photo' : 'Add photo'}
            </Button>
            {user?.image && (
              <Button
                type="button"
                variant="ghost"
                disabled={isBusy}
                onClick={() => void handleRemove()}
              >
                <Trash2 data-icon="inline-start" />
                Remove
              </Button>
            )}
          </div>
          <p className="max-w-52 text-xs leading-5 text-muted-foreground">
            JPG, PNG, or WebP. Maximum file size is 5 MB.
          </p>
        </div>
      </div>

      {error && (
        <p
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
