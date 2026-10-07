import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { CategoryForm, getCategoryById } from '@/modules/categories';
import type { Category } from '@/types';

export const metadata = { title: 'Edit Category | fanaticCoders' };
export const dynamic = 'force-dynamic';

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const access = await getCurrentAccess();
  if (!access?.can('blog', 'read') || !access.can('blog', 'update')) redirect('/unauthorized');

  const { categoryId } = await params;
  const response = await getCategoryById(categoryId);
  const category = response.success && response.data ? (response.data as Category) : null;
  if (!category) notFound();

  return (
    <CategoryForm
      category={category}
      header={
        <PageHeader
          title="Edit category"
          description={category.name}
          showBackButton
          backLabel="Categories"
        />
      }
    />
  );
}
