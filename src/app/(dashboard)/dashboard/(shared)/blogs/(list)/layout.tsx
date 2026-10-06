import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { BlogsFilters } from '@/modules/blogs';

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Blogs"
          description="Review drafts and published blogs."
          showBackButton={true}
          action={{ label: 'New blog', href: '/dashboard/blogs/new', icon: Plus }}
        />
      }
    >
      <FilterLayout filters={<BlogsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
