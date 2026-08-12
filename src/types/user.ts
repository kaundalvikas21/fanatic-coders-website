import type { components, operations } from './backend-types';
import type { Response } from './api';
import type { InviteMemberRole } from './invitation';

type Schemas = components['schemas'];

export type User = Schemas['User'];
export type ProfileUser = Schemas['ProfileUser'];
export type UpdateAvatarResponse =
  operations['updateAvatar']['responses'][200]['content']['application/json'];
export type DeleteAvatarResponse =
  operations['deleteAvatar']['responses'][200]['content']['application/json'];

export const USER_SORT_FIELDS = ['createdAt', 'role', 'userId', 'id'] as const;

export type UserSortField = (typeof USER_SORT_FIELDS)[number];
export type OrganizationMemberRole = InviteMemberRole | 'ADMIN';

export type GetUsersInput = {
  sortBy?: UserSortField;
  sortDirection?: 'asc' | 'desc';
  name?: string;
};

export type UserListItem = {
  id: string;
  role: string;
  createdAt?: Date | string;
  user: Pick<User, 'id' | 'name' | 'email'> & {
    image?: string | null;
  };
};

export type UsersData = {
  members: UserListItem[];
  total: number;
};

export type GetUsersResponse = Response<UsersData>;
export type GetUserMemberResponse = Response<UserListItem>;
