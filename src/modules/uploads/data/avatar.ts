'use server';

import { revalidatePath } from 'next/cache';

import { authApi } from '@/lib/axios/client';
import { getApiError, unwrap } from '@/lib/axios/utils';
import type { DeleteAvatarResponse, UpdateAvatarResponse } from '@/types';

export async function updateAvatar(formData: FormData): Promise<UpdateAvatarResponse> {
  try {
    const response = await unwrap<UpdateAvatarResponse>(
      authApi.put('/api/v1/me/avatar', formData, { timeout: 60_000 }),
    );

    revalidatePath('/dashboard/profile');

    return response;
  } catch (error) {
    return getApiError(error) as UpdateAvatarResponse;
  }
}

export async function deleteAvatar(): Promise<DeleteAvatarResponse> {
  try {
    const response = await unwrap<DeleteAvatarResponse>(authApi.delete('/api/v1/me/avatar'));

    revalidatePath('/dashboard/profile');

    return response;
  } catch (error) {
    return getApiError(error) as DeleteAvatarResponse;
  }
}
