import { redirect } from 'next/navigation';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getRoleHomePath } from '@/lib/auth/roles';
import { requireAuth } from '@/lib/auth/server';

export const metadata = {
  title: 'Dashboard | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await requireAuth();
  const access = await getCurrentAccess();
  const role = access?.role;

  if (!role) {
    redirect('/unauthorized');
  }

  redirect(getRoleHomePath(role));
}
