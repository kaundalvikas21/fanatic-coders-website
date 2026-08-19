'use client';

import { useState } from 'react';
import { Camera, LoaderCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { UserAvatar } from '@/components/shared/user-avatar';
import { ActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { ProfilePhotoUploader } from '@/components/dashboard/profile/ProfilePhotoUploader';
import { deleteAvatar } from '@/modules/uploads/data/avatar';
import { getUploadErrorMessage } from '@/modules/uploads/utils/file';
import { useAuth } from '@/providers/AuthProvider';

export function ProfileAvatar() {
  const { session, refetch } = useAuth();
  const user = session?.user;
  const [error, setError] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center">
        <div className="relative shrink-0">
          {user?.image ? (
            <Link
              href={{
                pathname: '/dashboard/photo',
                query: {
                  src: user.image,
                  alt: `${user.name || 'User'} profile photo`,
                },
              }}
              aria-label="View profile photo"
              className="block cursor-zoom-in rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <UserAvatar
                name={user.name}
                email={user.email}
                image={user.image}
                className="size-24 ring-1 ring-border"
                fallbackClassName="text-2xl"
              />
            </Link>
          ) : (
            <UserAvatar
              name={user?.name}
              email={user?.email}
              image={user?.image}
              className="size-24 ring-1 ring-border"
              fallbackClassName="text-2xl"
            />
          )}
          {isRemoving && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-full bg-background/75"
              role="status"
              aria-label="Removing profile image"
            >
              <LoaderCircle
                className="size-5 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <ActionDialog
              title={user?.image ? 'Change profile photo' : 'Add profile photo'}
              description="Choose the image shown across your workspace."
              contentClassName="sm:max-w-md"
              trigger={
                <Button variant="outline">
                  <Camera data-icon="inline-start" />
                  {user?.image ? 'Change photo' : 'Add photo'}
                </Button>
              }
            >
              <ProfilePhotoUploader />
            </ActionDialog>
            {user?.image && (
              <Button
                type="button"
                variant="ghost"
                disabled={isRemoving}
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
