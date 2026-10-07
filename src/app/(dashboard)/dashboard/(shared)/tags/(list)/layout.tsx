import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { PageHeader } from '@/components/shared/page-header';
import { TagForm } from '@/modules/tags';

export default function TagsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Tags"
          description="Label blogs with useful topics."
          actionSlot={
            <ActionSheet
              title="Create tag"
              description="Add a tag for blogs."
              showHeader
              contentClassName="sm:max-w-lg"
              trigger={
                <ActionSheetButton size="lg">
                  <Plus data-icon="inline-start" />
                  New tag
                </ActionSheetButton>
              }
            >
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <TagForm />
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
