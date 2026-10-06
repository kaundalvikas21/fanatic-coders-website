import { redirect } from 'next/navigation';

import { getCurrentAccess } from '@/lib/auth/current-access';
import { NewBlogForm } from './NewBlogForm';

export const metadata = {
  title: 'Create Blog | fanaticCoders',
};

export default async function NewBlogPage() {
  const access = await getCurrentAccess();

  if (!access?.can('blog', 'create')) {
    redirect('/unauthorized');
  }

  return <NewBlogForm />;
}
