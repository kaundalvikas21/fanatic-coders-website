import type { Response } from './api';
import type { UserListItem } from './user';

export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] as const;
export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const TASK_STATUS_OPTIONS = [
  { value: 'TODO', label: 'To do' },
  { value: 'IN_PROGRESS', label: 'In progress' },
  { value: 'IN_REVIEW', label: 'In review' },
  { value: 'DONE', label: 'Done' },
] as const satisfies readonly { value: TaskStatus; label: string }[];

export const TASK_PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
] as const satisfies readonly { value: TaskPriority; label: string }[];

export const TASK_STATUS_BADGE_VARIANTS = {
  TODO: 'outline',
  IN_PROGRESS: 'secondary',
  IN_REVIEW: 'default',
  DONE: 'outline',
} as const satisfies Record<TaskStatus, 'default' | 'secondary' | 'outline'>;
export const TASK_STATUS_COLORS = {
  TODO: 'gray',
  IN_PROGRESS: 'blue',
  IN_REVIEW: 'amber',
  DONE: 'green',
} as const;

export const TASK_PRIORITY_BADGE_VARIANTS = {
  LOW: 'outline',
  MEDIUM: 'secondary',
  HIGH: 'default',
  URGENT: 'destructive',
} as const satisfies Record<TaskPriority, 'default' | 'secondary' | 'outline' | 'destructive'>;
export const TASK_PRIORITY_COLORS = {
  LOW: 'gray',
  MEDIUM: 'blue',
  HIGH: 'amber',
  URGENT: 'red',
} as const;

export type TaskAssignee = {
  id: string;
  taskId: string;
  projectId: string;
  memberId: string;
  createdAt: string;
  member: UserListItem;
};

export type Task = {
  id: string;
  projectId: string;
  createdByMemberId: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
  estimatedHours?: string | number | null;
  createdAt: string;
  updatedAt: string;
  assignees: TaskAssignee[];
  createdBy?: UserListItem;
  project?: {
    id: string;
    name: string;
  };
};

export type CreateTaskRequest = {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  estimatedHours?: number;
  assigneeMemberIds?: string[];
};

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export type TaskResponse = Response<Task>;
export type TasksResponse = Response<Task[]>;
