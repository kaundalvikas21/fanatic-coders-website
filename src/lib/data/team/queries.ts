import 'server-only';

import { publicApi } from '@/lib/axios/client';
import { unwrap } from '@/lib/axios/utils';
import type { TeamMember, TeamResponse } from '@/types';

export async function getPublicTeam(): Promise<TeamMember[]> {
  try {
    const response = await unwrap<TeamResponse>(publicApi.get('/api/v1/team'));
    return response.success ? response.data : [];
  } catch {
    return [];
  }
}
