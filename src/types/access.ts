import type { Response, Schemas } from './api';

export type AccessPermissions = Schemas['PermissionStatements'];
export type AccessModel = keyof AccessPermissions;
export type AccessOperation<R extends AccessModel = AccessModel> = NonNullable<
  AccessPermissions[R]
>[number];
export type CurrentAccessData = Schemas['Me'];
export type CurrentAccess = CurrentAccessData & {
  can: <R extends AccessModel>(model: R, operation: AccessOperation<R>) => boolean;
};
export type GetCurrentAccessResponse = Response<CurrentAccessData>;
