'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { BlogForm } from '@/modules/blogs';

export function NewBlogForm() {
  const router = useRouter();

  return (
    <BlogForm
      header={
        <PageHeader
          title="Create blog"
          description="Write and publish a new blog post."
          showBackButton
        />
      }
      onSaved={(blog) => {
        router.replace(`/dashboard/blogs/${blog.id}`);
        router.refresh();
      }}
    />
  );
}
