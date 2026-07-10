import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getRole, getRoleHomePath } from '@/lib/auth/roles';
import { requireAuth } from '@/lib/auth/server';

export const metadata = {
  title: 'Dashboard | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await requireAuth();
  const role = await getRole(await headers());

  if (!role) {
    redirect('/unauthorized');
  }

  redirect(getRoleHomePath(role));
}
