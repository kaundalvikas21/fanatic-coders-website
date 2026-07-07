'use server';

import { revalidatePath } from 'next/cache';
import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { InviteMemberRequest, InviteMemberResponse } from '@/types';

export async function inviteMember(payload: InviteMemberRequest): Promise<InviteMemberResponse> {
  try {
    const response = await unwrap<InviteMemberResponse>(
      authApi.post('/api/v1/invitations', payload),
    );

    revalidatePath('/dashboard/leads');

    return response;
  } catch (error) {
    return getApiError(error);
  }
}
