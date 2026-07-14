import 'server-only';

import { getCurrentAccess } from '@/lib/auth/current-access';
import { createServiceRequestPermissions } from '@/modules/service-requests/utils/permissions';

export async function getServiceRequestPermissions() {
  const access = await getCurrentAccess();

  return createServiceRequestPermissions(access);
}
