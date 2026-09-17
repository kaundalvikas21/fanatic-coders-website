import 'server-only';

import { cache } from 'react';
import { notFound } from 'next/navigation';
import { getUserMemberById } from './queries';

// Reuse the member lookup when the shared layout and active route render together.
export const getMemberDetail = cache(async (memberId: string) => {
  const response = await getUserMemberById(memberId);
  const member = response.success ? response.data : null;

  if (!member) notFound();

  return member;
});
