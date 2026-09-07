'use client';

import { LoaderCircle, LogOut } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { authClient } from '@/lib/auth/client';
import { clearFrontendBearerToken } from '@/lib/auth/token-client';

type SignOutScope = 'current' | 'all';

export function SessionSettings() {
  const [pendingScope, setPendingScope] = useState<SignOutScope | null>(null);
  const [allSessionsDialogOpen, setAllSessionsDialogOpen] = useState(false);

  async function handleSignOut(scope: SignOutScope) {
    setPendingScope(scope);

    try {
      const { error } =
        scope === 'all' ? await authClient.revokeSessions() : await authClient.signOut();

      if (error) {
        toast.error(error.message || 'Could not sign you out.');
        setPendingScope(null);
        return;
      }

      await clearFrontendBearerToken().catch(() => undefined);
      window.location.replace('/login');
    } catch {
      toast.error('Could not sign you out. Please try again.');
      setPendingScope(null);
    }
  }

  const isPending = pendingScope !== null;

  return (
    <div className="divide-y divide-border/70">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">Current session</p>
          <p className="text-sm text-muted-foreground">Sign out only from this browser.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="self-start sm:self-auto"
          disabled={isPending}
          onClick={() => void handleSignOut('current')}
        >
          {pendingScope === 'current' ? (
            <LoaderCircle className="animate-spin motion-reduce:animate-none" />
          ) : (
            <LogOut data-icon="inline-start" />
          )}
          {pendingScope === 'current' ? 'Signing out' : 'Sign out'}
        </Button>
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">All sessions</p>
          <p className="text-sm text-muted-foreground">
            Sign out from this browser and every other device.
          </p>
        </div>

        <ActionDialog
          open={allSessionsDialogOpen}
          onOpenChange={(open) => {
            if (pendingScope !== 'all') setAllSessionsDialogOpen(open);
          }}
          title="Sign out from all sessions?"
          description="You will be signed out on this browser and every other device using your account."
          trigger={
            <Button
              type="button"
              variant="destructive"
              className="self-start sm:self-auto"
              disabled={isPending}
            >
              <LogOut data-icon="inline-start" />
              Sign out all
            </Button>
          }
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={pendingScope === 'all'}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              disabled={pendingScope === 'all'}
              onClick={() => void handleSignOut('all')}
            >
              {pendingScope === 'all' ? (
                <LoaderCircle className="animate-spin motion-reduce:animate-none" />
              ) : (
                <LogOut data-icon="inline-start" />
              )}
              {pendingScope === 'all' ? 'Signing out' : 'Sign out all sessions'}
            </Button>
          </DialogFooter>
        </ActionDialog>
      </div>
    </div>
  );
}
