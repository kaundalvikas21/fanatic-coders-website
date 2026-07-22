import type { ProjectMemberRole, ProjectStatus } from '@/types';

export const PROJECT_STATUS_LABELS = {
  PLANNING: 'Planning',
  ACTIVE: 'Active',
  ON_HOLD: 'On hold',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
} as const satisfies Record<ProjectStatus, string>;

export const PROJECT_MEMBER_ROLE_LABELS = {
  MANAGER: 'Manager',
  MEMBER: 'Member',
} as const satisfies Record<ProjectMemberRole, string>;
