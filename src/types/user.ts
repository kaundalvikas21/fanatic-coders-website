import type { components } from './backend-types';
import type { Response } from './api';
import type { InviteMemberRole } from './invitation';

type Schemas = components['schemas'];

export type User = Schemas['User'];
export type ProfileUser = Schemas['ProfileUser'];
export type UpdateAvatarResponse = Response<ProfileUser>;
export type DeleteAvatarResponse = Response<ProfileUser>;

export const USER_SORT_FIELDS = ['createdAt', 'role', 'userId', 'id'] as const;

export type UserSortField = (typeof USER_SORT_FIELDS)[number];
export type OrganizationMemberRole = InviteMemberRole | 'ADMIN';

export type GetUsersInput = {
  sortBy?: UserSortField;
  sortDirection?: 'asc' | 'desc';
  name?: string;
  limit?: number;
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
