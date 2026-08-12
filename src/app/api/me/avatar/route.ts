import { authApi } from '@/lib/axios/client';
import { createProxyErrorResponse, createProxyResponse } from '@/lib/axios/proxy-response';
import type { DeleteAvatarResponse, UpdateAvatarResponse } from '@/types';

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const response = await authApi.put<UpdateAvatarResponse>('/api/v1/me/avatar', formData);

    return createProxyResponse(response);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}

export async function DELETE() {
  try {
    const response = await authApi.delete<DeleteAvatarResponse>('/api/v1/me/avatar');

    return createProxyResponse(response);
  } catch (error) {
    return createProxyErrorResponse(error);
  }
}
