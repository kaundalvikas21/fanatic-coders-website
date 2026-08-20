'use client';

import { useDialog } from '@/components/shared/action-dialog';
import { AvatarUploader } from '@/modules/uploads/components/AvatarUploader';
import { useAuth } from '@/providers/AuthProvider';

export function ProfilePhotoUploader() {
  const dialog = useDialog();
  const { session, refetch } = useAuth();

  return (
    <AvatarUploader
      value={session?.user.image ?? null}
      onChange={async () => {
        await refetch();
        dialog?.close();
      }}
    />
  );
}
