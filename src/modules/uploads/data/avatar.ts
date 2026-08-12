import { browserApi } from '@/lib/axios/browser-client';
import { unwrap } from '@/lib/axios/utils';
import type { DeleteAvatarResponse, UpdateAvatarResponse } from '@/types';

export function updateAvatar(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  return unwrap(browserApi.put<UpdateAvatarResponse>('/api/me/avatar', formData));
}

export function deleteAvatar() {
  return unwrap(browserApi.delete<DeleteAvatarResponse>('/api/me/avatar'));
}
