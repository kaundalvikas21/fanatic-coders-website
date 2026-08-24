'use client';

import dynamic from 'next/dynamic';
import { ChevronDown, ListChecks } from 'lucide-react';
import { ActionCollapsible } from '@/components/shared/action-collapsible';
import { Button } from '@/components/ui/button';
import { useTaskCard } from './TaskCardContext';

const TaskAddOnList = dynamic(
  () => import('./TaskAddOnList').then((module) => module.TaskAddOnList),
  {
    ssr: false,
    loading: () => (
      <div className="h-24 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
    ),
  },
);

export function TaskAddOnSection() {
  const task = useTaskCard();
  const addOnTasks = task.addOnTasks ?? [];
  const completedCount = addOnTasks.filter((item) => item.isCompleted).length;

  return (
    <ActionCollapsible
      contentClassName="pt-3"
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-auto w-full justify-start gap-2 px-0 py-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <ListChecks aria-hidden="true" />
          <span className="flex-1 text-left">
            {addOnTasks.length === 0
              ? 'Add checklist'
              : `${completedCount} of ${addOnTasks.length} complete`}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 motion-reduce:transition-none"
          />
        </Button>
      }
    >
      <TaskAddOnList />
    </ActionCollapsible>
  );
}
