import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { PageHeader } from '@/components/shared/page-header';
import { CategoryForm } from '@/modules/categories';

export default function CategoriesLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Categories"
          description="Organize blogs by topic."
          actionSlot={
            <ActionSheet
              title="Create category"
              description="Add a category for blogs."
              showHeader
              contentClassName="sm:max-w-lg"
              trigger={
                <ActionSheetButton size="lg">
                  <Plus data-icon="inline-start" />
                  New category
                </ActionSheetButton>
              }
            >
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <CategoryForm />
              </div>
            </ActionSheet>
          }
        />
      }
    >
      {children}
    </ListsLayout>
  );
}
