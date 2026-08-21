'use client';

import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ListTodo, Plus } from 'lucide-react';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { SelectField } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import type { Project, UserListItem } from '@/types';
import { TaskCreateForm } from './TaskCreateForm';
import { useTaskPermissions } from '../../hooks/use-task-permissions';

const ALL_PROJECTS_VALUE = 'all';

type TasksProjectToolbarProps = {
  projects: Project[];
  assignableMembers: UserListItem[];
};

export function TasksProjectToolbar({ projects, assignableMembers }: TasksProjectToolbarProps) {
  const { canCreate } = useTaskPermissions();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const selectedProjectId = projects.find(
    (project) => pathname === `/dashboard/tasks/${project.id}`,
  )?.id;
  const options = [
    { value: ALL_PROJECTS_VALUE, label: 'All projects' },
    ...projects.map((project) => ({ value: project.id, label: project.name })),
  ];

  function handleProjectChange(projectId: string) {
    const href =
      projectId === ALL_PROJECTS_VALUE
        ? '/dashboard/tasks'
        : `/dashboard/tasks/${encodeURIComponent(projectId)}`;

    startTransition(() => router.replace(href));
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SelectField
        id="tasks-project-filter"
        value={selectedProjectId ?? ALL_PROJECTS_VALUE}
        options={options}
        onChange={handleProjectChange}
        ariaLabel="Filter tasks by project"
        disabled={isPending}
        size="lg"
        className="w-full sm:w-80"
      />

      {canCreate && selectedProjectId ? (
        <ActionSheet
          title="Create task"
          description="Add delivery work to the selected project."
          trigger={
            <ActionSheetButton size="lg">
              <Plus data-icon="inline-start" />
              Create task
            </ActionSheetButton>
          }
        >
          <div className="min-h-0 flex-1 p-3">
            <WidgetCard
              icon={ListTodo}
              title="New task"
              description="Enter the task details and choose who will work on it."
              className="gap-3 [--card-spacing:--spacing(3)]"
              contentClassNames="px-3"
            >
              <TaskCreateForm
                projectId={selectedProjectId}
                assignableMembers={assignableMembers}
              />
            </WidgetCard>
          </div>
        </ActionSheet>
      ) : null}
    </div>
  );
}
