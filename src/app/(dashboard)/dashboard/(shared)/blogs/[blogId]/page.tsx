import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { BlogForm, getBlogById } from '@/modules/blogs';
import type { Blog } from '@/types';

export const metadata = {
  title: 'Edit Blog | fanaticCoders',
};

export const dynamic = 'force-dynamic';

type BlogDetailPageProps = {
  params: Promise<{ blogId: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const access = await getCurrentAccess();

  if (!access?.can('blog', 'read') || !access.can('blog', 'update')) {
    redirect('/unauthorized');
  }

  const { blogId } = await params;
  const response = await getBlogById(blogId);
  const blog = response.success && response.data ? (response.data as Blog) : null;

  if (!blog) {
    notFound();
  }

  return (
    <BlogForm
      blog={blog}
      header={
        <PageHeader
          title="Edit blog"
          description={blog.title}
          showBackButton
          backLabel="Blogs"
        />
      }
    />
  );
}
