import 'server-only';

import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';
import { authServerClient, getServerAuthFetchOptions } from '@/lib/auth/server-client';
import type {
  GetUserMemberResponse,
  GetUsersInput,
  GetUsersResponse,
  OrganizationMemberRole,
  UserListItem,
} from '@/types';
import { ApiResponse, HttpStatus } from '@/utils/api-response';
import { isOrganizationMemberRole, parseRoles } from '@/lib/auth/roles';

const USERS_PAGE_LIMIT = 10;

export async function getUsers(input: GetUsersInput = {}): Promise<GetUsersResponse> {
  const name = input.name?.trim();

  try {
    const result = await authServerClient.organization.listMembers({
      query: {
        organizationSlug: FCOP_ORGANIZATION_SLUG,
        limit: name ? 100 : Math.min(Math.max(input.limit ?? USERS_PAGE_LIMIT, 1), 100),
        offset: 0,
        sortBy: input.sortBy ?? 'createdAt',
        sortDirection: input.sortDirection ?? 'desc',
      },
      fetchOptions: await getServerAuthFetchOptions(),
    });

    if (result.error) {
      return ApiResponse({
        success: false,
        status: HttpStatus.BAD_REQUEST,
        message: result.error.message ?? 'Could not load users.',
        error: {
          code: result.error.code ?? 'USERS_QUERY_FAILED',
        },
      });
    }

    if (!result.data) {
      return ApiResponse({
        success: false,
        status: HttpStatus.INTERNAL_ERROR,
        message: 'Could not load users.',
        error: {
          code: 'USERS_QUERY_EMPTY_RESPONSE',
        },
      });
    }

    if (!name) {
      return ApiResponse({
        success: true,
        status: HttpStatus.OK,
        message: 'Users loaded successfully.',
        data: result.data,
      });
    }

    const normalizedName = name.toLowerCase();
    const members = result.data.members
      .filter((member) => member.user.name.toLowerCase().includes(normalizedName))
      .slice(0, USERS_PAGE_LIMIT) as UserListItem[];

    return ApiResponse({
      success: true,
      status: HttpStatus.OK,
      message: 'Users loaded successfully.',
      data: {
        members,
        total: members.length,
      },
    });
  } catch {
    return ApiResponse({
      success: false,
      status: HttpStatus.INTERNAL_ERROR,
      message: 'Could not load users.',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}

export async function getOrganizationMembersByRole(
  roles: readonly OrganizationMemberRole[],
): Promise<UserListItem[]> {
  const response = await getUsers({ sortBy: 'createdAt' });
  const allowedRoles = new Set(roles);

  if (!response.success || !response.data) {
    return [];
  }

  return response.data.members.filter((member) =>
    parseRoles(member.role).some(
      (role) => isOrganizationMemberRole(role) && allowedRoles.has(role),
    ),
  );
}

export async function getUserMemberById(memberId: string): Promise<GetUserMemberResponse> {
  try {
    const result = await authServerClient.organization.listMembers({
      query: {
        organizationSlug: FCOP_ORGANIZATION_SLUG,
        limit: 1,
        offset: 0,
        filterField: 'id',
        filterValue: memberId,
        filterOperator: 'eq',
      },
      fetchOptions: await getServerAuthFetchOptions(),
    });

    if (result.error) {
      return ApiResponse({
        success: false,
        status: HttpStatus.BAD_REQUEST,
        message: result.error.message ?? 'Could not load user.',
        error: {
          code: result.error.code ?? 'USER_QUERY_FAILED',
        },
      });
    }

    const member = (result.data?.members[0] as UserListItem | undefined) ?? null;

    if (!member) {
      return ApiResponse({
        success: false,
        status: HttpStatus.NOT_FOUND,
        message: 'User not found.',
        error: {
          code: 'USER_NOT_FOUND',
        },
      });
    }

    return ApiResponse({
      success: true,
      status: HttpStatus.OK,
      message: 'User loaded successfully.',
      data: member,
    });
  } catch {
    return ApiResponse({
      success: false,
      status: HttpStatus.INTERNAL_ERROR,
      message: 'Could not load user.',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}
