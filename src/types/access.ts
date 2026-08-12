import type { Response } from './api';

export type AccessOperation = 'create' | 'read' | 'update' | 'delete';

export type AccessModel =
  | 'ac'
  | 'comment'
  | 'dashboard'
  | 'lead'
  | 'member'
  | 'organization'
  | 'payment'
  | 'project'
  | 'proposal'
  | 'serviceRequest'
  | 'task'
  | 'team';

export type AccessPermissions = Partial<Record<AccessModel, readonly AccessOperation[]>>;

export type CurrentAccessData = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
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
