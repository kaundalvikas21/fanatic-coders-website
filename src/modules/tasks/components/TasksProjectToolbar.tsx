'use client';

import { useTransition } from 'react';
import { Plus } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { SelectField } from '@/components/shared/forms/SelectField';
import { useProjectOptions } from '@/modules/projects/hooks';
import type { UserListItem } from '@/types';
import { TaskForm } from './forms';
import { useTaskPermissions } from '../hooks/use-task-permissions';

const ALL_PROJECTS_VALUE = 'all';

type TasksProjectToolbarProps = {
  assignableMembers: UserListItem[];
};

export function TasksProjectToolbar({ assignableMembers }: TasksProjectToolbarProps) {
  const { canCreate } = useTaskPermissions();
  const { projectOptions, isLoading } = useProjectOptions();
  const [isPending, startTransition] = useTransition();
  const [projectId, setProjectId] = useQueryState(
    'projectId',
    parseAsString.withOptions({ shallow: false, startTransition }),
  );
  const selectedProjectId = projectOptions.some((project) => project.value === projectId)
    ? projectId
    : null;
  const options = [{ value: ALL_PROJECTS_VALUE, label: 'All projects' }, ...projectOptions];

  function handleProjectChange(projectId: string) {
    void setProjectId(projectId === ALL_PROJECTS_VALUE ? null : projectId);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SelectField
        id="tasks-project-filter"
        value={selectedProjectId ?? ALL_PROJECTS_VALUE}
        options={options}
        onChange={handleProjectChange}
        ariaLabel="Filter tasks by project"
        disabled={isPending || isLoading}
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
            <TaskForm
              projectId={selectedProjectId}
              assignableMembers={assignableMembers}
            />
          </div>
        </ActionSheet>
      ) : null}
    </div>
  );
}
