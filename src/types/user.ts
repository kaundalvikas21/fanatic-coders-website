import type { components } from './backend-types';
import type { Response } from './api';

type Schemas = components['schemas'];

export type User = Schemas['User'];

export const USER_SORT_FIELDS = ['createdAt', 'role', 'userId', 'id'] as const;

export type UserSortField = (typeof USER_SORT_FIELDS)[number];

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
