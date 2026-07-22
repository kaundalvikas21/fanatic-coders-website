import 'server-only';

import { getCurrentAccess } from '@/lib/auth/current-access';
import { createProjectPermissions } from '@/modules/projects/utils/permissions';

export async function getProjectPermissions() {
  const access = await getCurrentAccess();

  return createProjectPermissions(access);
}
