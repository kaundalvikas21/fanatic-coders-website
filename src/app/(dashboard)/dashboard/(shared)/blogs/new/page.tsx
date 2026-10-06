import { redirect } from 'next/navigation';

import { PageHeader } from '@/components/shared/page-header';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { BlogForm } from '@/modules/blogs';

export const metadata = {
  title: 'Create Blog | fanaticCoders',
};

export default async function NewBlogPage() {
  const access = await getCurrentAccess();

  if (!access?.can('blog', 'create')) {
    redirect('/unauthorized');
  }

  return (
    <BlogForm
      header={
        <PageHeader
          title="Create blog"
          description="Write and publish a new blog post."
          showBackButton
        />
      }
    />
  );
}
