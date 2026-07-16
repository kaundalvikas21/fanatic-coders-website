import type { Response } from './api';

export type AccessOperation = 'create' | 'read' | 'update' | 'delete';

export type AccessModel =
  | 'ac'
  | 'billing'
  | 'comment'
  | 'dashboard'
  | 'deliverable'
  | 'file'
  | 'lead'
  | 'member'
  | 'organization'
  | 'project'
  | 'revenue'
  | 'serviceRequest'
  | 'serviceRequestMessage'
  | 'task'
  | 'team'
  | 'timeEntry';

export type AccessPermissions = Partial<Record<AccessModel, readonly AccessOperation[]>>;

export type CurrentAccessData = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  organizationId: string;
  memberId: string;
  role: string;
  permissions: AccessPermissions;
};

export type CurrentAccess = CurrentAccessData & {
  can: (model: AccessModel, operation: AccessOperation) => boolean;
};

export type GetCurrentAccessResponse = Response<CurrentAccessData>;
