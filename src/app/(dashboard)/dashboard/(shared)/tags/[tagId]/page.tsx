import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { TagForm, getTagById } from '@/modules/tags';
import type { Tag } from '@/types';

export const metadata = { title: 'Edit Tag | fanaticCoders' };
export const dynamic = 'force-dynamic';

export default async function TagDetailPage({ params }: { params: Promise<{ tagId: string }> }) {
  const access = await getCurrentAccess();
  if (!access?.can('blog', 'read') || !access.can('blog', 'update')) redirect('/unauthorized');

  const { tagId } = await params;
  const response = await getTagById(tagId);
  const tag = response.success && response.data ? (response.data as Tag) : null;
  if (!tag) notFound();

  return (
    <TagForm
      tag={tag}
      header={
        <PageHeader
          title="Edit tag"
          description={tag.name}
          showBackButton
          backLabel="Tags"
        />
      }
    />
  );
}
