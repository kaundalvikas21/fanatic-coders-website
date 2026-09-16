'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { useActionDialog } from '@/components/shared/action-dialog';
import type { UserListItem } from '@/types';

export function DeleteUserActions({
  member,
  redirectTo,
}: {
  member: UserListItem;
  redirectTo?: string;
}) {
  const { close } = useActionDialog();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (pending) return;
    setPending(true);

    try {
      const { error } = await authClient.admin.removeUser({ userId: member.user.id });
      if (error) {
        toast.error(error.message || 'Could not delete user.');
        return;
      }

      toast.success('User deleted.');
      // Remove deleted users from assignment pickers.
      void mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/organization/members/options'),
      ).catch(() => undefined);
      close();
      // Leave the detail page after deletion so it does not reload a missing account.
      if (redirectTo) router.replace(redirectTo);
      else router.refresh();
    } catch {
      toast.error('Request failed. Refresh before retrying.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className="flex justify-end gap-2"
      aria-busy={pending}
    >
      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={pending}
        onClick={close}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="lg"
        disabled={pending}
        onClick={() => void handleDelete()}
      >
        {pending ? 'Deleting...' : 'Delete user'}
      </Button>
    </div>
  );
}
