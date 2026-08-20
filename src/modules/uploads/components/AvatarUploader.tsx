'use client';

import { toast } from 'sonner';

import { FileUploader } from '@/modules/uploads/components/FileUploader';
import { deleteAvatar, updateAvatar } from '@/modules/uploads/data/avatar';
import type { ProfileUser } from '@/types';

type AvatarUploaderProps = {
  className?: string;
  disabled?: boolean;
  onChange: (url: string | null) => void | Promise<void>;
  value: string | null;
};

export function AvatarUploader({ className, disabled, onChange, value }: AvatarUploaderProps) {
  return (
    <FileUploader<ProfileUser>
      accept={{
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      }}
      className={className}
      currentUrl={value}
      disabled={disabled}
      label="Drop a profile image here or click to browse"
      maxSizeBytes={5 * 1024 * 1024}
      name="image"
      onUpload={async (file) => {
        const response = await updateAvatar(file);

        if (!response.success || !response.data) {
          throw new Error(response.message || 'Profile image upload failed.');
        }

        return response.data;
      }}
      onUploadSuccess={async (user) => {
        await onChange(user.image);
        toast.success('Profile image updated.');
      }}
      onRemove={async () => {
        const response = await deleteAvatar();

        if (!response.success || !response.data) {
          throw new Error(response.message || 'Profile image removal failed.');
        }

        await onChange(response.data.image);
        toast.success('Profile image removed.');
      }}
    />
  );
}
