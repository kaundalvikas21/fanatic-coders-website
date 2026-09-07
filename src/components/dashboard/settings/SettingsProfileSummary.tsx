'use client';

import { CalendarDays, Mail, Pencil } from 'lucide-react';
import Link from 'next/link';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getRoleLabel } from '@/lib/auth/roles';
import { useAuth } from '@/providers/AuthProvider';
import { usePermissions } from '@/providers/PermissionProvider';
import { formatDate } from '@/utils/date';

export function SettingsProfileSummary() {
  const { session, isPending } = useAuth();
  const { role } = usePermissions();

  if (isPending) {
    return (
      <Card
        className="bg-card/80 py-0"
        aria-label="Loading account information"
        aria-busy="true"
      >
        <CardContent className="flex items-center gap-4 p-5 sm:p-6">
          <Skeleton className="size-20 shrink-0 rounded-full" />
          <div className="grid flex-1 gap-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full max-w-sm" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const user = session?.user;

  return (
    <Card className="bg-card/80 py-0">
      <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <UserAvatar
          name={user?.name}
          email={user?.email}
          image={user?.image}
          className="size-20 shrink-0 ring-1 ring-border"
          fallbackClassName="text-xl font-semibold"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-semibold">{user?.name || 'Signed in user'}</h2>
            <Badge variant="secondary">{getRoleLabel(role)}</Badge>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {user?.email && (
              <span className="inline-flex min-w-0 items-center gap-2">
                <Mail
                  className="size-4 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{user.email}</span>
              </span>
            )}
            {user?.createdAt && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays
                  className="size-4"
                  aria-hidden="true"
                />
                Joined {formatDate(user.createdAt)}
              </span>
            )}
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Link href="/dashboard/settings/profile">
            <Pencil data-icon="inline-start" />
            Edit profile
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
